import type React from "react";
import { useNavigate, useParams } from "react-router-dom";
import LinkButton from "../ui/LinkButton";
import Gallery from "./Gallery";

const GallerySection: React.FC = () => {
    const navigate = useNavigate();
    const { username } = useParams<{ username: string }>();

    return (
        <Gallery limit={3}>
            <div className="flex justify-center items-center w-full p-4 mt-3">
                <LinkButton
                    text={"View All"}
                    onClick={() => {
                        navigate(`/gallery/${username}`);
                    }}
                />
            </div>
        </Gallery>
    );
};

export default GallerySection;
