"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";

const tutorials = [
  {
    id: "1",
    title: "The AI Music Video Agent",
    thumbnail: "https://picsum.photos/seed/tut1/300/170",
    badge: "ES",
  },
  {
    id: "2",
    title: "How to Create Clips",
    thumbnail: "https://picsum.photos/seed/tut2/300/170",
    badge: "ES",
  },
  {
    id: "3",
    title: "Freebeat AI Tutorial",
    thumbnail: "https://picsum.photos/seed/tut3/300/170",
    badge: "ES",
  },
  {
    id: "4",
    title: "AI Video Creation",
    thumbnail: "https://picsum.photos/seed/tut4/300/170",
    badge: null,
  },
  {
    id: "5",
    title: "Como hacer un VIDEOCLIP",
    thumbnail: "https://picsum.photos/seed/tut5/300/170",
    badge: "ES",
  },
  {
    id: "6",
    title: "AI Music Video Guide",
    thumbnail: "https://picsum.photos/seed/tut6/300/170",
    badge: "ES",
  },
];

export function Tutorials() {
  return (
    <section className="py-2">
      <div className="mb-4">
        <h2 className="font-bold text-lg">
          Agent Feature <span className="text-muted-foreground">Tutorials</span>
        </h2>
      </div>

      <div className="scrollbar-hide flex gap-3 overflow-x-auto pb-2">
        {tutorials.map((tutorial, index) => (
          <motion.button
            animate={{ opacity: 1, x: 0 }}
            className="group relative flex w-52 shrink-0 cursor-pointer flex-col overflow-hidden rounded-xl text-left"
            initial={{ opacity: 0, x: 20 }}
            key={tutorial.id}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative aspect-video overflow-hidden rounded-xl">
              <img
                alt={tutorial.title}
                className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
                height={117}
                src={tutorial.thumbnail}
                width={208}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
                <div className="flex size-12 items-center justify-center rounded-full bg-freebeat-pink/90 backdrop-blur-sm">
                  <Play className="size-5 fill-white text-white" />
                </div>
              </div>

              {tutorial.badge && (
                <div className="absolute top-2 left-2 rounded bg-freebeat-green px-1.5 py-0.5 font-bold text-[10px] text-white">
                  {tutorial.badge}
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/90 via-black/50 to-transparent p-3 pt-8">
                <p className="font-bold text-white text-xs leading-tight drop-shadow-md">
                  {tutorial.title}
                </p>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </section>
  );
}
