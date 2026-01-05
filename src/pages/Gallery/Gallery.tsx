import React, { useState } from 'react';
import { rooms } from '../../data/rooms';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaSearchPlus, FaArrowRight, FaArrowLeft } from 'react-icons/fa';

const Gallery: React.FC = () => {
    // 1. Gather all images with categories
    // We'll map them to a uniform structure: { src, category, title }
    const allImages = React.useMemo(() => {
        const images: { src: string; category: string; title: string }[] = [];
        const seen = new Set();

        rooms.forEach(room => {
            room.images.forEach(img => {
                if (!seen.has(img)) {
                    seen.add(img);
                    let cat = 'Rooms';
                    if (room.type.includes('HALL') || room.type.includes('GROUND')) cat = 'Events';
                    if (room.id === 'exterior' || img.includes('eloheem.jpg')) cat = 'Exterior'; // Heuristic

                    images.push({
                        src: img,
                        category: cat,
                        title: room.name
                    });
                }
            });
        });
        return images;
    }, []);

    const [filter, setFilter] = useState('All');
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

    const filteredImages = filter === 'All'
        ? allImages
        : allImages.filter(img => img.category === filter);

    const tabs = ['All', 'Rooms', 'Events'];

    const openLightbox = (index: number) => setSelectedImageIndex(index);
    const closeLightbox = () => setSelectedImageIndex(null);

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (selectedImageIndex !== null) {
            setSelectedImageIndex((selectedImageIndex + 1) % filteredImages.length);
        }
    };

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (selectedImageIndex !== null) {
            setSelectedImageIndex((selectedImageIndex - 1 + filteredImages.length) % filteredImages.length);
        }
    };

    return (
        <div className="gallery-page">
            {/* Parallax Hero */}
            <div className="gallery-hero">
                <div className="gallery-hero-bg"></div>
                <div className="gallery-hero-overlay"></div>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="gallery-hero-content"
                >
                    <span className="gallery-subtitle">Portfolio</span>
                    <h1 className="gallery-title">Our Gallery</h1>
                    <p className="gallery-desc">Experience the elegance of Eloheem Suites through our lens.</p>
                </motion.div>
            </div>

            {/* Filter Tabs */}
            <div className="gallery-container">
                <div className="gallery-tabs">
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setFilter(tab)}
                            className={`gallery-tab ${filter === tab ? 'active' : ''}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Gallery Grid */}
                <motion.div layout className="gallery-grid">
                    <AnimatePresence>
                        {filteredImages.map((img, index) => (
                            <motion.div
                                layout
                                key={img.src}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.5 }}
                                className="gallery-item group"
                                onClick={() => openLightbox(index)}
                            >
                                <img src={img.src} alt={img.title} className="gallery-img" />
                                <div className="gallery-item-overlay">
                                    <div className="gallery-overlay-content">
                                        <FaSearchPlus className="gallery-icon" />
                                        <h4>{img.title}</h4>
                                        <span>{img.category}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedImageIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="lightbox"
                        onClick={closeLightbox}
                    >
                        <button className="lightbox-close" onClick={closeLightbox}>
                            <FaTimes />
                        </button>

                        <button className="lightbox-nav prev" onClick={prevImage}>
                            <FaArrowLeft />
                        </button>

                        <motion.img
                            key={filteredImages[selectedImageIndex].src}
                            initial={{ x: 100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -100, opacity: 0 }}
                            src={filteredImages[selectedImageIndex].src}
                            alt="Full View"
                            className="lightbox-img"
                            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
                        />

                        <button className="lightbox-nav next" onClick={nextImage}>
                            <FaArrowRight />
                        </button>

                        <div className="lightbox-caption">
                            <h3>{filteredImages[selectedImageIndex].title}</h3>
                            <p>{filteredImages[selectedImageIndex].category}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Gallery;
