import { User } from "@/types/wedding";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const deleteImage = async (user: User, name: string) => {
    const imagePath = `user_uploads/${user.id}/${name}`;

    const { error } = await supabase.storage.from("images").remove([imagePath]);

    if (error) {
        toast({
            title: "Failed to remove image",
            variant: "destructive",
        });
        console.log("Failed to remove image", error);
        return false;
    }

    toast({
        title: "Image deleted successfully!",
    });

    return true;
};

export default deleteImage;
