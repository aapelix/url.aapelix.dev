"use client"

import React, { useState, useRef, useEffect } from 'react';
import { motion, MotionProps } from "motion/react";
import { QRCodeSVG } from 'qrcode.react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { ArrowDown, Github, Sparkles, Rocket, Shield, ChartBar, Coffee, Twitter, Mail, Heart, MessageCircle, } from "lucide-react";
import { CopyButton } from "@/components/copy-button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { redirect } from 'next/navigation';
import { Separator } from "@/components/ui/separator";
import Link from 'next/link';

const FloatingCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: { clientX: number; clientY: number; }) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div 
      className="fixed w-6 h-6 rounded-full bg-white/5 pointer-events-none blur-sm z-50"
      animate={{ 
        x: position.x - 12,
        y: position.y - 12,
      }}
      transition={{ type: "spring", damping: 30 }}
    />
  );
};

type ShimmerButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & MotionProps;

const ShimmerButton: React.FC<ShimmerButtonProps> = ({ children, ...props }) => (
  <motion.button
    className="relative overflow-hidden bg-zinc-900 text-white px-6 py-2 rounded-md group"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    {...props}
  >
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0"
      animate={{
        x: ["-200%", "200%"],
      }}
      transition={{
        repeat: Infinity,
        duration: 2,
        ease: "linear",
      }}
    />
    {children}
  </motion.button>
);

export default function Home() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [input, setInput] = useState("");
  const [id, setId] = useState("");
  const qrCodeRef = useRef(null);
  const { setTheme } = useTheme();

  setTheme("dark");

  const features = [
    { icon: Rocket, title: "Fast and Reliable", description: "Shorten your URLs instantly with unmatched reliability." },
    { icon: Shield, title: "Secure and Private", description: "Your data is safe with us. We prioritize your privacy." },
    { icon: ChartBar, title: "Analytics", description: "Track and analyze the performance of your shortened URLs." }
  ];
  
  const upload = async () => {
    const response = await fetch('/api/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: input }),
    });

    const data = await response.json();
    if (data.url_id) {
      setId(data.url_id);
      setInput("");
    } else {
      setId(data.error);
    }
  };

  const downloadQR = () => {
    if (!qrCodeRef.current) return;

    const svg = (qrCodeRef.current as HTMLElement).querySelector("svg");
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);

      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngFile;
      downloadLink.download = id + ".png";
      downloadLink.click();
    };

    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      upload();
      setIsDialogOpen(true);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 15
      }
    }
  };

  return (
    <motion.main 
      className="font-mono relative overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <FloatingCursor />
      
      <header className="min-h-screen relative flex flex-col items-center justify-center bg-gradient-to-b from-black via-zinc-950 to-transparent text-white px-4 text-center gap-6">
        <motion.div 
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.05),rgba(0,0,0,0))]"
          animate={{
            opacity: [0.5, 0.8, 0.5],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        <motion.h1 
          className="text-5xl md:text-7xl font-extrabold"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          Shorten URLs
          <motion.span 
            className="ml-7 text-purple-200/80"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Seamlessly
          </motion.span>
        </motion.h1>
        
        <motion.p 
          className="text-lg md:text-xl text-zinc-400"
          variants={itemVariants}
        >
          Shorten a link! It&apos;s free and easy to use. No credit card required.
        </motion.p>

        <motion.div 
          className="relative group"
          variants={itemVariants}
        >
          <motion.div 
            className="absolute -inset-1 bg-white/10 rounded-lg blur opacity-25"
            whileHover={{ opacity: 0.5 }}
            transition={{ duration: 0.3 }}
          />
          <div className="relative flex flex-wrap gap-4 justify-center items-center bg-zinc-900 p-2 rounded-lg">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", damping: 20 }}
            >
              <Input
                onChange={(e) => setInput(e.target.value)}
                className="w-96 bg-zinc-800 border-zinc-700 focus:ring-white/20 transition-all duration-300"
                type="url"
                placeholder="https://example.com/"
                onKeyDown={handleKeyDown}
              />
            </motion.div>
            
            <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <AlertDialogTrigger asChild>
                <ShimmerButton>
                  <span className="relative z-10 flex items-center gap-2" onClick={upload}>
                    <Sparkles className="w-4 h-4" />
                    Shorten!
                  </span>
                </ShimmerButton>
              </AlertDialogTrigger>
              <AlertDialogContent>
              <AlertDialogHeader>
                {id && (
                  <>
                    <AlertDialogTitle>{id === "URL is required" ? id : "Your URL was successfully shortened!"}</AlertDialogTitle>
                    <AlertDialogDescription>
                      {id !== "URL is required" && (
                        <>
                          <div className="bg-zinc-800 p-3 rounded-lg flex justify-between items-center">
                            <p>https://aapelix.link/{id}</p>
                            <CopyButton text={`https://aapelix.link/${id}`} />
                          </div>
                          <div className="mt-4 flex gap-2">
                            <div ref={qrCodeRef} className="inline-block">
                              <QRCodeSVG value={`https://aapelix.link/${id}`} />
                            </div>
                            <Button className="mt-2" onClick={downloadQR}>Download QR</Button>
                          </div>
                        </>
                      )}
                    </AlertDialogDescription>
                  </>
                )}
                {!id && (
                  <>
                    <AlertDialogTitle>Generating your URL</AlertDialogTitle>
                    <AlertDialogDescription>Please wait...</AlertDialogDescription>
                  </>
                )}
              </AlertDialogHeader>
              <AlertDialogFooter>
                {id && (
                  <AlertDialogCancel onClick={() => redirect(`https://aapelix.link/${id}`)}>Go to site</AlertDialogCancel>
                )}
                <AlertDialogAction>Close</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
            </AlertDialog>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-20"
        >
          <ArrowDown className="text-zinc-500" />
        </motion.div>
      </header>
      
      <div className="relative">
        <motion.div 
          className="absolute inset-x-0 -top-32 h-32 bg-gradient-to-b from-transparent to-zinc-900"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        
        <motion.section 
          className="relative w-full py-20 px-6 bg-zinc-900 text-white"
          variants={containerVariants}
        >
          <motion.div 
            className="absolute inset-0 bg-grid-white/[0.02] mask-gradient"
            animate={{
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        <div className="max-w-5xl mx-auto text-center relative">
          <motion.h2 
            className="text-4xl font-bold mb-12"
            variants={itemVariants}
          >
            Why Choose Us?
          </motion.h2>
          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={containerVariants}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", damping: 15 }}
              >
                <Card className="bg-zinc-800/50 border-zinc-700/50 backdrop-blur-sm group h-52">
                  <CardHeader>
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="mx-auto"
                    >
                      <feature.icon className="w-8 h-8 text-purple-200/60" />
                    </motion.div>
                    <CardTitle className="mt-4">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-zinc-400">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>
      </div>

      <motion.footer 
        className="relative w-full bg-black text-white py-16"
        variants={containerVariants}
      >

        
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <motion.div 
              className="space-y-4"
              variants={itemVariants}
            >
              <h3 className="text-lg font-bold">About</h3>
              <p className="text-sm text-zinc-400">
                A modern URL shortener built with performance and simplicity in mind. Open source and free to use.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="inline-block"
              >
                <a
                  href="https://buymeacoffee.com/aapelix"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
                >
                  <Coffee className="w-4 h-4" />
                  <span>Support the project</span>
                </a>
              </motion.div>
            </motion.div>

            <motion.div 
              className="space-y-4"
              variants={itemVariants}
            >
              <h3 className="text-lg font-bold">Quick Links</h3>
              <ul className="space-y-2 text-sm text-zinc-400">
                <motion.li whileHover={{ x: 5 }} className="transition-colors hover:text-white">
                  <Link href="/tos">Terms of Service</Link>
                </motion.li>
                <motion.li whileHover={{ x: 5 }} className="transition-colors hover:text-white">
                  <Link href="/">Privacy Policy</Link>
                </motion.li>
                <motion.li whileHover={{ x: 5 }} className="transition-colors hover:text-white">
                  <Link href="/">API Documentation</Link>
                </motion.li>
                <motion.li whileHover={{ x: 5 }} className="transition-colors hover:text-white">
                  <Link href="/">System Status</Link>
                </motion.li>
              </ul>
            </motion.div>

            <motion.div 
              className="space-y-4"
              variants={itemVariants}
            >
              <h3 className="text-lg font-bold">Connect</h3>
              <ul className="space-y-2 text-sm text-zinc-400">
                <motion.li 
                  whileHover={{ x: 5 }}
                  className="transition-colors hover:text-white"
                >
                  <a 
                    href="https://github.com/aapelix/url.aapelix.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub Repository</span>
                  </a>
                </motion.li>
                <motion.li 
                  whileHover={{ x: 5 }}
                  className="transition-colors hover:text-white"
                >
                  <a 
                    href="https://twitter.com/aapelix"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    <Twitter className="w-4 h-4" />
                    <span>Twitter</span>
                  </a>
                </motion.li>
                <motion.li 
                  whileHover={{ x: 5 }}
                  className="transition-colors hover:text-white"
                >
                  <a 
                    href="mailto:contact@aapelix.dev"
                    className="inline-flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Email Us</span>
                  </a>
                </motion.li>
                <motion.li 
                  whileHover={{ x: 5 }}
                  className="transition-colors hover:text-white"
                >
                  <a 
                    href="https://discord.gg/aapelix"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Discord Community</span>
                  </a>
                </motion.li>
              </ul>
            </motion.div>

            <motion.div 
              className="space-y-4"
              variants={itemVariants}
            >
              <h3 className="text-lg font-bold">Statistics</h3>
              <ul className="space-y-2 text-sm">
                <motion.li 
                  className="flex items-center justify-between p-2 bg-zinc-900/50 rounded-md"
                  whileHover={{ scale: 1.02 }}
                >
                  <span className="text-zinc-400">Total URLs</span>
                  <span className="text-white font-mono">30+</span>
                </motion.li>
                <motion.li 
                  className="flex items-center justify-between p-2 bg-zinc-900/50 rounded-md"
                  whileHover={{ scale: 1.02 }}
                >
                  <span className="text-zinc-400">Active Users</span>
                  <span className="text-white font-mono">1</span>
                </motion.li>
                <motion.li 
                  className="flex items-center justify-between p-2 bg-zinc-900/50 rounded-md"
                  whileHover={{ scale: 1.02 }}
                >
                  <span className="text-zinc-400">API Calls/Day</span>
                  <span className="text-white font-mono">650+</span>
                </motion.li>
              </ul>
            </motion.div>
          </div>

          <Separator className="bg-zinc-800 my-8" />

          <motion.div 
            className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-zinc-400"
            variants={itemVariants}
          >
            <div className="flex items-center gap-2">
              <span>© 2024 aapelix.link</span>
              <span>·</span>
              <motion.span 
                className="inline-flex items-center gap-1"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span>Made with</span>
                <Heart className="w-4 h-4 text-red-400" />
                <span>by</span>
                <a 
                  href="https://github.com/aapelix"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-purple-200/80 transition-colors"
                >
                  aapelix
                </a>
              </motion.span>
            </div>

            <motion.div 
              className="flex items-center gap-4"
              variants={containerVariants}
            >
              <motion.a
                href="https://github.com/aapelix/url.aapelix.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://twitter.com/aapelix"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="mailto:contact@aapelix.dev"
                className="hover:text-white transition-colors"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="w-5 h-5" />
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </motion.footer>
    </motion.main>
  );
}