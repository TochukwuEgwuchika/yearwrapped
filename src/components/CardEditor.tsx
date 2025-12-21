import { useState, useRef, ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Upload, Download, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Category, CategoryField } from '@/types/wrapped';
import { WrappedCardPreview } from './WrappedCardPreview';
import { toPng } from 'html-to-image';
import { toast } from 'sonner';

interface CardEditorProps {
  category: Category;
  onBack: () => void;
}

const gradientClasses: Record<string, string> = {
  magenta: 'gradient-magenta',
  sunset: 'gradient-sunset',
  aurora: 'gradient-aurora',
  cosmic: 'gradient-cosmic',
  golden: 'gradient-golden',
};

export const CardEditor = ({ category, onBack }: CardEditorProps) => {
  const [formData, setFormData] = useState<Record<string, string | number>>({});
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (fieldId: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
  };

  const handleDownload = async () => {
    if (!cardRef.current) return;

    setIsDownloading(true);
    try {
      const dataUrl = await toPng(cardRef.current, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: 'transparent',
      });

      const link = document.createElement('a');
      link.download = `wrapped-2025-${category.id}.png`;
      link.href = dataUrl;
      link.click();

      toast.success('Card downloaded successfully!');
    } catch (error) {
      console.error('Error downloading card:', error);
      toast.error('Failed to download card. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const renderField = (field: CategoryField) => {
    if (field.type === 'image') {
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
              <span className="text-sm text-muted-foreground">Click to upload</span>
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

    if (field.type === 'textarea') {
      return (
        <div key={field.id} className="space-y-2">
          <Label htmlFor={field.id}>{field.label}</Label>
          <Textarea
            id={field.id}
            placeholder={field.placeholder}
            value={(formData[field.id] as string) || ''}
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
          type={field.type === 'number' ? 'number' : 'text'}
          placeholder={field.placeholder}
          value={(formData[field.id] as string) || ''}
          onChange={(e) =>
            handleInputChange(
              field.id,
              field.type === 'number' ? parseInt(e.target.value) || '' : e.target.value
            )
          }
          className="bg-secondary/50 border-border"
        />
      </div>
    );
  };

  return (
    <section className="min-h-screen px-4 py-8 sm:py-12">
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
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Editor Form */}
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
                {category.fields.map(renderField)}
              </div>
            </div>

            <Button
              onClick={handleDownload}
              disabled={isDownloading}
              className={`w-full py-6 text-lg rounded-xl ${gradientClasses[category.gradient]} border-0 hover:opacity-90 transition-opacity`}
            >
              <Download className="w-5 h-5 mr-2" />
              {isDownloading ? 'Downloading...' : 'Download Card'}
            </Button>
          </motion.div>

          {/* Card Preview */}
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
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
