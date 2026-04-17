import { useEffect, useRef } from "react";
import Uppy from "@uppy/core";
import Dashboard from "@uppy/dashboard";
import ImageEditor from '@uppy/image-editor';

import "@uppy/core/css/style.min.css";
import "@uppy/dashboard/css/style.min.css";
import '@uppy/image-editor/css/style.min.css';

export const FileUploader = ({ setFormData, resetTrigger, initialImages = []  }) => {
  const uppyRef = useRef(null);

  useEffect(() => {
    const uppy = new Uppy({
      id: "file-uploader",
      restrictions: {
        maxNumberOfFiles: 20,
        allowedFileTypes: [".jpg", ".png", ".jpeg"],
        maxFileSize: 10 * 1024 * 1024,
      },
      autoProceed: false,
    });

    uppy.use(Dashboard, {
      inline: true,
      target: '#uppy-dashboard',
      showProgressDetails: true,  
      note: "Accepted file types: jpg, png, pdf. Maximum size per photo: 10MB",
      proudlyDisplayPoweredByUppy: false,
      showLinkToFileUploadResult: false,
      showRemoveButtonAfterComplete: false,
      showEditButton: true,
      height: 600,
      hideUploadButton: true, 
    })

    uppy.use(ImageEditor, {
      quality: 0.8,
      cropperOptions: {
          viewMode: 1,
          background: false
      }
    })

    uppy.on("file-added", (image) => {
      setFormData(prev => {
        const currentImages = prev?.images ?? [];
        return { ...prev, images: [...currentImages, image] };
      });
    });

    uppy.on("file-removed", (image) => {
      setFormData(prev => {
        const currentImages = prev?.images ?? [];
        return { ...prev, images: currentImages.filter(f => f.id !== image.id) };
      });
    });

    uppyRef.current = uppy;

    return () => {
      uppy.destroy();
    } 
  }, []);

  useEffect(() => {
    if (uppyRef.current) {
      uppyRef.current.cancelAll();
      uppyRef.current.clear();
    }
  }, [resetTrigger]);

  useEffect(() => {
    if (!uppyRef.current || initialImages.length === 0) return;

    initialImages.forEach(file => {
      uppyRef.current.addFile({
        name: file.name,
        type: file.type,
        data: file,
        source: "local",
      });
    });

  }, [initialImages]);

   return ( <div id="uppy-dashboard"></div> )
}

//File uploader of content featured image
export const FeaturedImageFileUploader = ({ setFormData, resetTrigger, initialFeaturedImage = null }) => {
  const uppyRefer = useRef(null);

  useEffect(() => {
    const uppyfe = new Uppy({
      id: "file-uploader",
      restrictions: {
        maxNumberOfFiles: 1,
        allowedFileTypes: [".jpg", ".png", ".jpeg"],
        maxFileSize: 10 * 1024 * 1024,
      },
      autoProceed: false,
    });

    uppyfe.use(Dashboard, {
      inline: true,
      target: '#uppyfe-dashboard',
      showProgressDetails: true,  
      note: "Accepted file types: jpg, png, pdf. Maximum size per photo: 10MB",
      proudlyDisplayPoweredByUppy: false,
      showLinkToFileUploadResult: false,
      showRemoveButtonAfterComplete: false,
      showEditButton: false,
      height: 280,
      hideUploadButton: true, 
    })

    uppyfe.on("file-added", (image) => {
      setFormData(prev => {
        return { ...prev, featuredImage: image };
      });
    });

    uppyfe.on("file-removed", () => {
      setFormData(prev => {
        return { ...prev, featuredImage: null };
      });
    });

    uppyRefer.current = uppyfe;

    return () => {
      uppyfe.destroy();
    } 
  }, []);

  useEffect(() => {
    if (uppyRefer.current) {
      uppyRefer.current.cancelAll();
      uppyRefer.current.clear();
    }
  }, [resetTrigger]);

  useEffect(() => {
    if (!initialFeaturedImage) return;
    const file = initialFeaturedImage;

    uppyRefer.current.addFile({
      name: file.name,
      type: file.type,
      data: file,
      source: "local",
    });
  }, [initialFeaturedImage]);

   return ( <div id="uppyfe-dashboard"></div> )
}