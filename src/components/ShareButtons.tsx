import { useState, RefObject } from 'react';
import { motion } from 'framer-motion';
import { Share2, Copy, Check, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { toPng } from 'html-to-image';

interface ShareButtonsProps {
  cardRef: RefObject<HTMLDivElement>;
  title: string;
  imageDataUrl?: string | null;
  onImageGenerated?: (dataUrl: string) => void;
}

// Social platform icons as SVG components
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.757-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
  </svg>
);

export const ShareButtons = ({ cardRef, title, imageDataUrl, onImageGenerated }: ShareButtonsProps) => {
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Generate image from card ref
  const generateImage = async (): Promise<string | null> => {
    // Use cached image if available
    if (imageDataUrl) return imageDataUrl;

    if (!cardRef.current) {
      toast.error('Card not ready');
      return null;
    }

    setIsGenerating(true);
    try {
      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 4,
        cacheBust: true,
        skipAutoScale: true,
        filter: (node) => {
          if (node instanceof Element) {
            if (node.classList?.contains('bg-noise')) {
              return false;
            }
          }
          return true;
        },
      });

      // Notify parent to save the wrapped
      onImageGenerated?.(dataUrl);

      return dataUrl;
    } catch {
      toast.error('Failed to generate image');
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  const handleNativeShare = async () => {
    const dataUrl = await generateImage();
    if (!dataUrl) return;

    try {
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      const file = new File([blob], `${title}.png`, { type: 'image/png' });

      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: `My ${title} - Wrapped 2025`,
        });
        toast.success('Shared successfully!');
      } else {
        handleCopyImage();
      }
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        toast.error('Failed to share. Try copying instead.');
      }
    }
  };

  const handleCopyImage = async () => {
    const dataUrl = await generateImage();
    if (!dataUrl) return;

    try {
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ]);
      setCopied(true);
      toast.success('Image copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Failed to copy. Your browser may not support this.');
    }
  };

  const shareToWhatsApp = async () => {
    const dataUrl = await generateImage();
    if (!dataUrl) return;

    // Copy image to clipboard first
    try {
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ]);
      toast.success('Image copied! Paste it in WhatsApp');
    } catch {
      // Fallback - just open WhatsApp
    }

    const text = encodeURIComponent(`Check out my 2025 Wrapped! 🎉`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const shareToTwitter = async () => {
    const dataUrl = await generateImage();
    if (!dataUrl) return;

    // Copy image to clipboard first
    try {
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ]);
      toast.success('Image copied! Paste it in your tweet');
    } catch {
      // Fallback - just open Twitter
    }

    const text = encodeURIComponent(`Check out my 2025 Wrapped! 🎉 #Wrapped2025 #YearInReview`);
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
  };

  const shareToFacebook = async () => {
    const dataUrl = await generateImage();
    if (!dataUrl) return;

    // Copy image to clipboard first
    try {
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ]);
      toast.success('Image copied! Paste it on Facebook');
    } catch {
      // Fallback - just open Facebook
    }

    window.open(`https://www.facebook.com/sharer/sharer.php`, '_blank');
  };

  const buttons = [
    { icon: WhatsAppIcon, label: 'WhatsApp', onClick: shareToWhatsApp, color: 'hover:bg-green-600' },
    { icon: TwitterIcon, label: 'X', onClick: shareToTwitter, color: 'hover:bg-gray-700' },
    { icon: FacebookIcon, label: 'Facebook', onClick: shareToFacebook, color: 'hover:bg-blue-600' },
    { icon: InstagramIcon, label: 'Instagram', onClick: handleCopyImage, color: 'hover:bg-pink-600' },
    { icon: copied ? Check : Copy, label: 'Copy', onClick: handleCopyImage, color: 'hover:bg-secondary' },
  ];

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="border-border"
        disabled={isGenerating}
        aria-label={isOpen ? "Close share menu" : "Open share menu"}
      >
        {isGenerating ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : isOpen ? (
          <X className="w-4 h-4" />
        ) : (
          <Share2 className="w-4 h-4" />
        )}
      </Button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          className="absolute bottom-full right-0 mb-2 p-2 bg-card border border-border rounded-xl shadow-lg flex gap-2"
        >
          {buttons.map(({ icon: Icon, label, onClick, color }) => (
            <Button
              key={label}
              variant="ghost"
              size="icon"
              onClick={onClick}
              className={`${color} transition-colors`}
              title={label}
              aria-label={`Share to ${label}`}
              disabled={isGenerating}
            >
              <Icon />
            </Button>
          ))}

          {/* Native share button for mobile */}
          {typeof navigator !== 'undefined' && navigator.share && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNativeShare}
              className="hover:bg-primary"
              title="Share"
              aria-label="Share using device share"
              disabled={isGenerating}
            >
              <Share2 className="w-5 h-5" />
            </Button>
          )}
        </motion.div>
      )}
    </div>
  );
};
