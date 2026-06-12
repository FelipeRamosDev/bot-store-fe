import FileInput from "@/components/inputs/fileInput/FileInput";
import FieldSchema from "../FieldSchema";

export default class FileInputFieldSchema extends FieldSchema {
   constructor(setup = {}, form) {
      super(setup, form);

      this.Input = FileInput; // Specifies the input component as FileInput.
   }
}
