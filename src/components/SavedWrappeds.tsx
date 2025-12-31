import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Download, Trash2, Clock, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp, SavedWrapped } from '@/context/AppContext';
import { gradientStyles } from '@/lib/gradients';
import { GradientType } from '@/types/wrapped';
import { toast } from 'sonner';

interface SavedWrappedsProps {
  onBack: () => void;
}

export const SavedWrappeds = ({ onBack }: SavedWrappedsProps) => {
  const { getSavedWrappeds, deleteWrapped, clearAllWrappeds } = useApp();
  const wrappeds = getSavedWrappeds();

  const handleDelete = (id: string) => {
    deleteWrapped(id);
    toast.success('Wrapped deleted');
  };

  const handleClearAll = () => {
    if (confirm('Are you sure you want to delete all saved wrappeds?')) {
      clearAllWrappeds();
      toast.success('All wrappeds cleared');
    }
  };

  const handleDownload = (wrapped: SavedWrapped) => {
    const link = document.createElement('a');
    link.download = `wrapped-${wrapped.categoryId}.png`;
    link.href = wrapped.imageDataUrl;
    link.click();
    toast.success('Downloaded!');
  };

  const handleShare = async (wrapped: SavedWrapped) => {
    try {
      const response = await fetch(wrapped.imageDataUrl);
      const blob = await response.blob();
      const file = new File([blob], `${wrapped.categoryTitle}.png`, { type: 'image/png' });

      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: `My ${wrapped.categoryTitle} - Wrapped 2025`,
        });
      } else {
        // Copy to clipboard
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ]);
        toast.success('Image copied to clipboard!');
      }
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        toast.error('Failed to share');
      }
    }
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
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
            Back
          </Button>

          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold">
                Saved Wrappeds
              </h2>
              <p className="text-muted-foreground mt-2">
                {wrappeds.length} saved card{wrappeds.length !== 1 ? 's' : ''} (auto-delete after 30 days)
              </p>
            </div>
            {wrappeds.length > 0 && (
              <Button
                variant="destructive"
                size="sm"
                onClick={handleClearAll}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear All
              </Button>
            )}
          </div>
        </motion.div>

        {wrappeds.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-secondary/50 flex items-center justify-center">
              <Clock className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="font-display text-xl font-semibold mb-2">No saved wrappeds yet</h3>
            <p className="text-muted-foreground">
              Download or share a card to save it here
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            <AnimatePresence>
              {wrappeds.map((wrapped, index) => (
                <motion.div
                  key={wrapped.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                  className="group relative"
                >
                  {/* Card Preview */}
                  <div
                    className="relative aspect-[9/16] rounded-2xl overflow-hidden border border-white/10 shadow-lg"
                    style={{ background: gradientStyles[wrapped.gradient as GradientType] || gradientStyles.magenta }}
                  >
                    <img
                      src={wrapped.imageDataUrl}
                      alt={`${wrapped.categoryTitle} wrapped card`}
                      className="w-full h-full object-cover"
                    />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3">
                      <Button
                        size="sm"
                        onClick={() => handleDownload(wrapped)}
                        className="bg-white text-black hover:bg-white/90"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleShare(wrapped)}
                        className="border-white/50 text-white hover:bg-white/10"
                      >
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(wrapped.id)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </div>

                  {/* Card Info */}
                  <div className="mt-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{wrapped.categoryIcon}</span>
                      <span className="font-medium text-sm truncate">
                        {wrapped.categoryTitle}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatDate(wrapped.timestamp)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
};
