import type React from "react";
import { useId, useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import  useWedding from "@/hooks/useWedding";
import "@/styles/linkStyle.css";

interface EditableLinkProps {
   text: string;
   link: string;
   onSave: (text: string, link: string) => void;
   label?: string;
   className?: string;
   children?: React.ReactNode;
}

const EditableLink: React.FC<EditableLinkProps> = ({ text, link, onSave, label, className, children }) => {
   const [isOpen, setIsOpen] = useState(false);
   const [editText, setEditText] = useState(text);
   const [editLink, setEditLink] = useState(link);
   const { isLoggedIn } = useWedding();
   const editTextInputId = useId();
   const editLinkInputId = useId();

   const handleSave = () => {
      onSave(editText, editLink);
      setIsOpen(false);
   };

   const handleCancel = () => {
      setEditText(text);
      setEditLink(link);
      setIsOpen(false);
   };

   const handleOnEnterKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
         e.preventDefault();
         handleSave();
      }
   };

   const handleOnClick = () => {
      setEditText(text);
      setEditLink(link);
      console.log(link);
   };

   if (!isLoggedIn) {
      return (
         <a
            className={`link_component text-orange-500 transition-all duration-300 ease-in-out italic inline-block md:max-w-full ${className}`}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
         >
            {children || text}
         </a>
      );
   }

   return (
      <div className={`relative group`}>
         <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
               <button
                  className={`bg-red-300 md:bg-inherit hover:bg-red-300 duration-200 text-blue-700 ${className}`}
                  onClick={handleOnClick}
                  type="button"
               >
                  {children || text}
               </button>
            </DialogTrigger>
            <DialogTrigger asChild className="hidden md:block">
               <Button
                  variant="ghost"
                  size="sm"
                  className="absolute -top-1 -right-8 opacity-100 transition-opacity p-1 h-6 w-6"
                  onClick={handleOnClick}
               >
                  ✏️
               </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
               <DialogHeader>
                  <DialogTitle>{label}</DialogTitle>
               </DialogHeader>
               <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                     <Label htmlFor={editTextInputId}>Text</Label>
                     <Input
                        id={editTextInputId}
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onKeyDown={handleOnEnterKeyDown}
                     />
                  </div>
                  <div className="grid gap-2">
                     <Label htmlFor={editLinkInputId}>Link</Label>
                     <Input
                        id={editLinkInputId}
                        value={editLink}
                        onChange={(e) => setEditLink(e.target.value)}
                        onKeyDown={handleOnEnterKeyDown}
                     />
                  </div>
               </div>
               <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={handleCancel}>
                     Cancel
                  </Button>
                  <Button onClick={handleSave}>Save</Button>
               </div>
            </DialogContent>
         </Dialog>
      </div>
   );
};

export default EditableLink;
