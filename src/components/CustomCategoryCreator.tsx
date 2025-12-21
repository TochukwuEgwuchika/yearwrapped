import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus, Trash2, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CustomCategory, CustomQuestion, GradientType, Subcategory } from '@/types/wrapped';
import { toast } from 'sonner';

interface CustomCategoryCreatorProps {
  onBack: () => void;
  onSave: (category: Subcategory) => void;
}

const GRADIENT_OPTIONS: { value: GradientType; label: string; class: string }[] = [
  { value: 'magenta', label: 'Magenta', class: 'gradient-magenta' },
  { value: 'sunset', label: 'Sunset', class: 'gradient-sunset' },
  { value: 'aurora', label: 'Aurora', class: 'gradient-aurora' },
  { value: 'cosmic', label: 'Cosmic', class: 'gradient-cosmic' },
  { value: 'golden', label: 'Golden', class: 'gradient-golden' },
  { value: 'ocean', label: 'Ocean', class: 'gradient-ocean' },
  { value: 'forest', label: 'Forest', class: 'gradient-forest' },
  { value: 'berry', label: 'Berry', class: 'gradient-berry' },
  { value: 'fire', label: 'Fire', class: 'gradient-fire' },
  { value: 'midnight', label: 'Midnight', class: 'gradient-midnight' },
];

const ICON_OPTIONS = [
  '🏆', '⭐', '🎯', '💫', '✨', '🎉', '🎊', '💝', '🔥', '⚡',
  '🌟', '💎', '🎁', '🏅', '👑', '🦋', '🌈', '🎨', '📸', '🎬',
  '🎵', '📚', '✈️', '🚀', '💪', '🧠', '❤️', '🤝', '🌍', '🏠',
];

export const CustomCategoryCreator = ({ onBack, onSave }: CustomCategoryCreatorProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('🏆');
  const [gradient, setGradient] = useState<GradientType>('magenta');
  const [fields, setFields] = useState<{ id: string; label: string; type: 'text' | 'textarea' | 'number' | 'image'; placeholder: string }[]>([
    { id: 'field1', label: '', type: 'text', placeholder: '' },
  ]);

  const addField = () => {
    if (fields.length >= 6) {
      toast.error('Maximum 6 fields allowed');
      return;
    }
    setFields([
      ...fields,
      { id: `field${Date.now()}`, label: '', type: 'text', placeholder: '' },
    ]);
  };

  const removeField = (index: number) => {
    if (fields.length <= 1) {
      toast.error('At least one field is required');
      return;
    }
    setFields(fields.filter((_, i) => i !== index));
  };

  const updateField = (index: number, key: string, value: string) => {
    const updated = [...fields];
    updated[index] = { ...updated[index], [key]: value };
    setFields(updated);
  };

  const handleSave = () => {
    if (!title.trim()) {
      toast.error('Please enter a category title');
      return;
    }

    const validFields = fields.filter((f) => f.label.trim());
    if (validFields.length === 0) {
      toast.error('Please add at least one field with a label');
      return;
    }

    const customCategory: Subcategory = {
      id: `custom-${Date.now()}`,
      title: title.trim(),
      description: description.trim() || 'Custom category',
      icon,
      gradient,
      fields: validFields.map((f, i) => ({
        id: f.id,
        label: f.label,
        type: f.type,
        placeholder: f.placeholder || undefined,
        required: i === 0,
      })),
    };

    onSave(customCategory);
    toast.success('Custom category created!');
  };

  return (
    <section className="min-h-screen px-4 py-8 sm:py-12">
      <div className="max-w-2xl mx-auto">
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

          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            Create <span className="text-gradient-magenta">Custom Category</span>
          </h2>
          <p className="text-muted-foreground">
            Design your own personalized wrapped card
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-2xl p-6 border border-border space-y-6"
        >
          {/* Basic Info */}
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Category Title *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Pet of the Year"
                className="bg-secondary/50 border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g., Celebrate your furry friend"
                className="bg-secondary/50 border-border"
              />
            </div>
          </div>

          {/* Icon Selection */}
          <div className="space-y-2">
            <Label>Choose Icon</Label>
            <div className="flex flex-wrap gap-2">
              {ICON_OPTIONS.map((iconOption) => (
                <button
                  key={iconOption}
                  type="button"
                  onClick={() => setIcon(iconOption)}
                  className={`w-10 h-10 rounded-lg text-xl flex items-center justify-center transition-all ${
                    icon === iconOption
                      ? 'bg-primary ring-2 ring-primary ring-offset-2 ring-offset-background'
                      : 'bg-secondary/50 hover:bg-secondary'
                  }`}
                >
                  {iconOption}
                </button>
              ))}
            </div>
          </div>

          {/* Gradient Selection */}
          <div className="space-y-2">
            <Label>Choose Gradient</Label>
            <div className="flex flex-wrap gap-2">
              {GRADIENT_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setGradient(option.value)}
                  className={`w-12 h-12 rounded-xl ${option.class} transition-all ${
                    gradient === option.value
                      ? 'ring-2 ring-foreground ring-offset-2 ring-offset-background scale-110'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                  title={option.label}
                />
              ))}
            </div>
          </div>

          {/* Fields */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Card Fields</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addField}
                className="gap-1"
              >
                <Plus className="w-3 h-3" />
                Add Field
              </Button>
            </div>

            <div className="space-y-3">
              {fields.map((field, index) => (
                <motion.div
                  key={field.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3 items-start bg-secondary/30 rounded-xl p-4"
                >
                  <div className="flex-1 grid gap-3 sm:grid-cols-3">
                    <Input
                      placeholder="Field label *"
                      value={field.label}
                      onChange={(e) => updateField(index, 'label', e.target.value)}
                      className="bg-secondary/50 border-border"
                    />
                    <Select
                      value={field.type}
                      onValueChange={(value) => updateField(index, 'type', value)}
                    >
                      <SelectTrigger className="bg-secondary/50 border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="text">Text</SelectItem>
                        <SelectItem value="textarea">Long Text</SelectItem>
                        <SelectItem value="number">Number</SelectItem>
                        <SelectItem value="image">Image</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      placeholder="Placeholder text"
                      value={field.placeholder}
                      onChange={(e) => updateField(index, 'placeholder', e.target.value)}
                      className="bg-secondary/50 border-border"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeField(index)}
                    className="text-muted-foreground hover:text-destructive shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Preview & Save */}
          <div className="pt-4 border-t border-border">
            <div className="flex items-center gap-4 mb-6">
              <div
                className={`w-16 h-16 rounded-2xl ${GRADIENT_OPTIONS.find((g) => g.value === gradient)?.class} flex items-center justify-center text-3xl`}
              >
                {icon}
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-foreground">
                  {title || 'Your Category'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {description || 'Category description'}
                </p>
              </div>
            </div>

            <Button
              onClick={handleSave}
              className="w-full gradient-magenta border-0 gap-2"
            >
              <Save className="w-4 h-4" />
              Create & Continue to Editor
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
