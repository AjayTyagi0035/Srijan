"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const images = [
  '/images/football1.jpg',
  '/images/football2.jpg',
  '/images/football3.jpg',
  '/images/football4.jpg',
  '/images/football5.jpg',
  '/images/football6.jpg',
  '/images/football7.jpg',
  '/images/football8.jpg',
];

const videos = [
  'https://www.youtube.com/embed/VIDEO_ID_1',
  'https://www.youtube.com/embed/VIDEO_ID_2',
  'https://www.youtube.com/embed/VIDEO_ID_3',
];

const events = [
  { title: 'Summer Training Camp', date: '2024-06-15', description: 'Intensive training for young talents.' },
  { title: 'Inter-School Tournament', date: '2024-07-20', description: 'Annual competition between local schools.' },
  { title: 'Coach Certification Program', date: '2024-08-10', description: 'Training for aspiring football coaches.' },
];

const IMAGES_PER_PAGE = 32; // 4 rows x 8 columns

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(images.length / IMAGES_PER_PAGE);
  const paginatedImages = images.slice((currentPage - 1) * IMAGES_PER_PAGE, currentPage * IMAGES_PER_PAGE);

  const handlePrevImage = () => {
    setSelectedImage((prev) => (prev !== null && prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNextImage = () => {
    setSelectedImage((prev) => (prev !== null && prev < images.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-gradient-to-r from-blue-600 to-green-400 p-4 sticky top-0 z-10">
        <nav className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Image src="/logo.png" alt="Srijan Football Academy Logo" width={40} height={40} />
            <span className="text-2xl font-bold text-white">Srijan Football Academy</span>
          </div>
          <ul className="flex space-x-4">
            {['Gallery', 'Videos', 'Events', 'About', 'Contact'].map((item) => (
              <li key={item}>
                <a href={`#${item.toLowerCase()}`} className="text-white hover:text-gray-200 transition-colors">
                  <i className={`fas fa-${item.toLowerCase()} mr-2`}></i>
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className="container mx-auto mt-8 px-4">
        <Tabs defaultValue="gallery" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="about">About Us</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>

          <TabsContent value="gallery">
            <h2 className="text-2xl font-bold mb-4">Image Gallery</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
              {paginatedImages.map((image, index) => (
                <div key={index} className="relative aspect-square">
                  <Image
                    src={image}
                    alt={`Football image ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg cursor-pointer"
                    onClick={() => setSelectedImage((currentPage - 1) * IMAGES_PER_PAGE + index)}
                  />
                </div>
              ))}
            </div>
            {totalPages > 1 && (
              <div className="flex justify-center mt-4">
                <Button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <span className="mx-4">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
            <Dialog open={selectedImage !== null} onOpenChange={() => setSelectedImage(null)}>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>Image Preview</DialogTitle>
                </DialogHeader>
                {selectedImage !== null && (
                  <div className="relative aspect-video">
                    <Image
                      src={images[selectedImage]}
                      alt="Selected image"
                      layout="fill"
                      objectFit="contain"
                    />
                    <Button className="absolute top-2 right-2" onClick={() => setSelectedImage(null)}>
                      <X />
                    </Button>
                    <Button className="absolute left-2 top-1/2 transform -translate-y-1/2" onClick={handlePrevImage}>
                      <ChevronLeft />
                    </Button>
                    <Button className="absolute right-2 top-1/2 transform -translate-y-1/2" onClick={handleNextImage}>
                      <ChevronRight />
                    </Button>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </TabsContent>

          <TabsContent value="videos">
            <h2 className="text-2xl font-bold mb-4">Video Section</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {videos.map((video, index) => (
                <div key={index} className="aspect-video">
                  <iframe
                    src={video}
                    title={`Football video ${index + 1}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full rounded-lg"
                  ></iframe>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="events">
            <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
            <div className="grid gap-4">
              {events.map((event, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold">{event.title}</h3>
                    <p className="text-sm text-gray-500">{event.date}</p>
                    <p className="mt-2">{event.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="about">
            <h2 className="text-2xl font-bold mb-4">About Us</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
                <p>
                  At Srijan Football Academy, we are dedicated to nurturing young talent and fostering a love for the beautiful game. Our mission is to provide top-notch training and opportunities for aspiring footballers to reach their full potential.
                </p>
                <h3 className="text-xl font-semibold mt-4 mb-2">Our Values</h3>
                <ul className="list-disc list-inside">
                  <li>Passion for the game</li>
                  <li>Teamwork and sportsmanship</li>
                  <li>Discipline and hard work</li>
                  <li>Continuous improvement</li>
                </ul>
                <h3 className="text-xl font-semibold mt-4 mb-2">Our History</h3>
                <p>
                  Founded in 2010, Srijan Football Academy has been at the forefront of football education in our community. Over the years, we've trained hundreds of young players, many of whom have gone on to play at collegiate and professional levels.
                </p>
              </div>
              <div className="relative aspect-video">
                <Image
                  src="/images/academy.jpg"
                  alt="Srijan Football Academy"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="contact">
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-2">Get in Touch</h3>
                <p className="mb-4">
                  We'd love to hear from you! Whether you have questions about our programs or want to join our academy, feel free to reach out.
                </p>
                <div className="space-y-2">
                  <p><strong>Address:</strong> 123 Football Street, Kolkata, West Bengal, India</p>
                  <p><strong>Phone:</strong> +91 98765 43210</p>
                  <p><strong>Email:</strong> info@srijanfootballacademy.com</p>
                </div>
              </div>
              <div className="aspect-video">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.1661841317805!2d88.3339391!3d22.5726284!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0277a67e64e701%3A0x2a8f6d0a0fb6e75d!2sEden%20Gardens!5e0!3m2!1sen!2sin!4v1650000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="bg-gray-800 text-white mt-16 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-2">Srijan Football Academy</h3>
              <p className="text-sm">Nurturing football talent and passion since 2010</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
              <ul className="space-y-1">
                <li><a href="#gallery" className="hover:text-gray-300">Gallery</a></li>
                <li><a href="#videos" className="hover:text-gray-300">Videos</a></li>
                <li><a href="#events" className="hover:text-gray-300">Events</a></li>
                <li><a href="#about" className="hover:text-gray-300">About Us</a></li>
                <li><a href="#contact" className="hover:text-gray-300">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-gray-300"><i className="fab fa-facebook"></i></a>
                <a href="#" className="hover:text-gray-300"><i className="fab fa-twitter"></i></a>
                <a href="#" className="hover:text-gray-300"><i className="fab fa-instagram"></i></a>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center text-sm">
            <p>&copy; 2024 Srijan Football Academy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}