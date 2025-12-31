import { useState, useRef, ChangeEvent, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {
  ArrowLeft,
  Upload,
  Download,
  Trash2,
  ArrowRight,
  Save,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Subcategory, CategoryField } from "@/types/wrapped";
import { Achievement } from "@/types/achievements";
import { WrappedCardPreview } from "./WrappedCardPreview";
import { ShareButtons } from "./ShareButtons";
import { AchievementToast } from "./AchievementToast";
import { toPng } from "html-to-image";
import { toast } from "sonner";
import { gradientClasses } from "@/lib/gradients";
import { YEAR } from "@/lib/config";
import { useApp } from "@/context/AppContext";
import {
  checkForNewAchievements,
  checkSpecialAchievements,
  checkPerfectionistAchievement,
  getAchievementById,
} from "@/lib/achievements";
import { validateCardForm } from "@/lib/validation";

interface CardEditorProps {
  category: Subcategory;
  onBack: () => void;
  onNext?: () => void;
  remainingCount?: number;
}

export const CardEditor = ({
  category,
  onBack,
  onNext,
  remainingCount = 0,
}: CardEditorProps) => {
  const {
    saveDraft,
    getDraft,
    saveWrapped,
    getSavedWrappeds,
    getAchievementState,
    unlockAchievement,
    markAchievementSeen,
    userName,
    setUserName,
  } = useApp();
  const [formData, setFormData] = useState<Record<string, string | number>>({});
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [lastDownloadedImage, setLastDownloadedImage] = useState<string | null>(
    null
  );
  const [newAchievement, setNewAchievement] = useState<Achievement | null>(
    null
  );
  const cardRef = useRef<HTMLDivElement>(null);
  const downloadButtonRef = useRef<HTMLButtonElement>(null);
  const saveButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLElement>(null);

  // Validate that all text/textarea fields are filled
  const isFormValid = useMemo(() => {
    return validateCardForm(category.fields, formData);
  }, [category.fields, formData]);

  // GSAP shake animation for invalid button clicks
  const { contextSafe } = useGSAP({ scope: containerRef });

  const shakeButton = contextSafe((buttonRef: React.RefObject<HTMLButtonElement | null>) => {
    if (!buttonRef.current) return;
    gsap.to(buttonRef.current, {
      x: [-10, 10, -8, 8, -5, 5, 0],
      duration: 0.5,
      ease: "power2.out",
    });
  });

  const handleInvalidClick = (buttonRef: React.RefObject<HTMLButtonElement | null>) => {
    shakeButton(buttonRef);
    toast.error("Please fill in all text fields first");
  };

  // Load draft and reset state on category change
  useEffect(() => {
    const draft = getDraft(category.id);
    if (draft) {
      setFormData(draft);
      toast.info("Draft restored!");
    } else {
      setFormData({});
    }
    // Reset card-specific state when category changes
    setIsSaved(false);
    setLastDownloadedImage(null);
    setImagePreview(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category.id]);

  const handleInputChange = (fieldId: string, value: string | number) => {
    const newData = { ...formData, [fieldId]: value };
    setFormData(newData);
    saveDraft(category.id, newData);
    setIsSaved(false); // Reset saved state when data changes
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image too large. Please use an image under 5MB.");
        return;
      }
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload a valid image file.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string);
        setIsSaved(false); // Reset saved state when image changes
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setIsSaved(false); // Reset saved state when image is removed
  };

  const generateCardImage = async () => {
    if (!cardRef.current) return null;
    const card = cardRef.current;

    // Use html-to-image with high pixel ratio for 4K quality
    const dataUrl = await toPng(card, {
      pixelRatio: 4, // 4x for 4K resolution
      cacheBust: true, // Ensure fresh image capture
      skipAutoScale: true,
      filter: (node) => {
        // Skip elements that don't render well
        if (node instanceof Element) {
          // Skip noise texture if it causes issues
          if (node.classList?.contains("bg-noise")) {
            return false;
          }
        }
        return true;
      },
    });
    return dataUrl;
  };

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setIsDownloading(true);
    try {
      const dataUrl = await generateCardImage();
      if (!dataUrl) throw new Error("Failed to generate image");

      const link = document.createElement("a");
      link.download = `wrapped-${YEAR}-${category.id}.png`;
      link.href = dataUrl;
      link.click();
      setLastDownloadedImage(dataUrl);

      toast.success("HD card downloaded!");
    } catch {
      toast.error("Failed to download card. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleSave = async () => {
    if (!cardRef.current || isSaved) return;
    setIsSaving(true);
    try {
      const dataUrl = lastDownloadedImage || (await generateCardImage());
      if (!dataUrl) throw new Error("Failed to generate image");

      saveWrapped(category, formData, dataUrl);
      setLastDownloadedImage(dataUrl);
      setIsSaved(true);
      toast.success("Card saved to My Wrappeds!");

      // Check for achievements
      checkAchievements();
    } catch {
      toast.error("Failed to save card. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const checkAchievements = () => {
    const savedWrappeds = getSavedWrappeds();
    const achievementState = getAchievementState();

    // Collect all newly unlocked achievements
    const newAchievements = [
      ...checkForNewAchievements(savedWrappeds, achievementState),
      ...checkSpecialAchievements(achievementState),
    ];

    // Check perfectionist achievement (all fields filled)
    const perfectionist = checkPerfectionistAchievement(
      formData,
      category.fields.length,
      achievementState
    );
    if (perfectionist) {
      newAchievements.push(perfectionist);
    }

    // Unlock and show toast for achievements (show first one)
    if (newAchievements.length > 0) {
      for (const unlocked of newAchievements) {
        unlockAchievement(unlocked.achievementId);
      }

      // Show toast for the first achievement
      const firstAchievement = getAchievementById(
        newAchievements[0].achievementId
      );
      if (firstAchievement) {
        setNewAchievement(firstAchievement);
        // Auto-dismiss after 4 seconds
        setTimeout(() => {
          setNewAchievement(null);
          markAchievementSeen(newAchievements[0].achievementId);
        }, 4000);
      }

      // If multiple achievements, show a toast for the rest
      if (newAchievements.length > 1) {
        setTimeout(() => {
          toast.success(
            `+${newAchievements.length - 1} more achievement${
              newAchievements.length > 2 ? "s" : ""
            } unlocked!`
          );
        }, 1000);
      }
    }
  };

  const renderField = (field: CategoryField) => {
    if (field.type === "image") {
      return (
        <div key={field.id} className="space-y-2">
          <Label htmlFor={field.id}>{field.label}</Label>
          {imagePreview ? (
            <div className="relative group">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-32 object-cover rounded-lg"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <label
              htmlFor={field.id}
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-colors bg-secondary/30"
            >
              <Upload className="w-8 h-8 text-muted-foreground mb-2" />
              <span className="text-sm text-muted-foreground">
                Click to upload
              </span>
              <input
                id={field.id}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          )}
        </div>
      );
    }

    if (field.type === "textarea") {
      return (
        <div key={field.id} className="space-y-2">
          <Label htmlFor={field.id}>{field.label}</Label>
          <Textarea
            id={field.id}
            placeholder={field.placeholder}
            value={(formData[field.id] as string) || ""}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            className="bg-secondary/50 border-border resize-none"
            rows={3}
          />
        </div>
      );
    }

    return (
      <div key={field.id} className="space-y-2">
        <Label htmlFor={field.id}>{field.label}</Label>
        <Input
          id={field.id}
          type={field.type === "number" ? "number" : "text"}
          placeholder={field.placeholder}
          value={(formData[field.id] as string) || ""}
          onChange={(e) =>
            handleInputChange(
              field.id,
              field.type === "number"
                ? parseInt(e.target.value) || ""
                : e.target.value
            )
          }
          className="bg-secondary/50 border-border"
        />
      </div>
    );
  };

  return (
    <section ref={containerRef} className="min-h-screen px-4 py-8 sm:py-12">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-6 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Categories
          </Button>
          <div className="flex items-center gap-4 mb-2">
            <span className="text-4xl">{category.icon}</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold">
              {category.title}
            </h2>
          </div>
          <p className="text-muted-foreground">{category.description}</p>
          {remainingCount > 0 && (
            <p className="text-sm text-primary mt-2">
              {remainingCount} more cards remaining in queue
            </p>
          )}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            <div className="bg-card rounded-2xl p-6 border border-border">
              <h3 className="font-display text-xl font-semibold mb-6">
                Customize Your Card
              </h3>
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="userName">Your Name (optional)</Label>
                  <Input
                    id="userName"
                    type="text"
                    placeholder="Add your name to the card"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="bg-secondary/50 border-border"
                  />
                </div>
                <div className="border-t border-border pt-5" />
                {category.fields.map(renderField)}
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                ref={downloadButtonRef}
                onClick={isFormValid ? handleDownload : () => handleInvalidClick(downloadButtonRef)}
                disabled={isDownloading}
                className={`flex-1 py-6 text-lg rounded-xl ${
                  gradientClasses[category.gradient]
                } border-0 transition-opacity duration-300 ${
                  !isFormValid ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"
                }`}
              >
                <Download className="w-5 h-5 mr-2" />
                {isDownloading ? "Downloading..." : "Download HD Card"}
              </Button>
              <Button
                ref={saveButtonRef}
                onClick={isFormValid ? handleSave : () => handleInvalidClick(saveButtonRef)}
                disabled={isSaving || isSaved}
                variant="outline"
                className={`py-6 px-6 text-lg rounded-xl border-border transition-opacity duration-300 ${
                  isSaved
                    ? "bg-green-500/20 border-green-500/50 text-green-400"
                    : !isFormValid
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                {isSaved ? (
                  <>
                    <Check className="w-5 h-5 mr-2" />
                    Saved
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5 mr-2" />
                    {isSaving ? "Saving..." : "Save"}
                  </>
                )}
              </Button>
              <ShareButtons
                cardRef={cardRef}
                title={category.title}
                imageDataUrl={lastDownloadedImage}
                onImageGenerated={(dataUrl) => {
                  setLastDownloadedImage(dataUrl);
                }}
              />
              {onNext && (
                <Button
                  onClick={onNext}
                  variant="outline"
                  className="py-6 px-6 text-lg rounded-xl border-border"
                >
                  Next <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="sticky top-8">
              <h3 className="font-display text-xl font-semibold mb-4 text-center lg:text-right">
                Preview
              </h3>
              <WrappedCardPreview
                ref={cardRef}
                category={category}
                formData={formData}
                imageUrl={imagePreview}
                userName={userName}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Achievement Toast */}
      <AnimatePresence>
        {newAchievement && (
          <AchievementToast
            achievement={newAchievement}
            onDismiss={() => {
              markAchievementSeen(newAchievement.id);
              setNewAchievement(null);
            }}
          />
        )}
      </AnimatePresence>
    </section>
  );
};
