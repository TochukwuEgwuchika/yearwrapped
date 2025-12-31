import { z } from "zod";
import { CategoryField } from "@/types/wrapped";

/**
 * Creates a dynamic Zod schema based on category fields
 * Only text and textarea fields are required
 */
export const createCardFormSchema = (fields: CategoryField[]) => {
  const shape: Record<string, z.ZodTypeAny> = {};

  fields.forEach((field) => {
    if (field.type === "text" || field.type === "textarea") {
      shape[field.id] = z.string().min(1, "Required");
    }
    // Number and image fields are optional
  });

  return z.object(shape);
};

/**
 * Validates form data against the dynamic schema
 * Returns true if all text/textarea fields have non-empty values
 */
export const validateCardForm = (
  fields: CategoryField[],
  formData: Record<string, string | number>
): boolean => {
  const schema = createCardFormSchema(fields);
  const result = schema.safeParse(formData);
  return result.success;
};
