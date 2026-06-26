 "use client";

import { useRef } from "react";
import Link from "next/link";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";

function Sphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <Float speed={2} rotationIntensity={2} floatIntensity={3}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[2, 1]} />
        <meshStandardMaterial color="#8b5cf6" wireframe />
      </mesh>
    </Float>
  );
}

export default function NextGenAI() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-white">
      {/* ── LEFT: Text content ── */}
      <div className="relative z-10 max-w-[50%] flex-[0_0_50%] pl-[8%] pr-[5%]">
        <motion.h1
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-5 text-[clamp(2.5rem,6vw,6rem)] font-extrabold leading-[1.05] text-[#0a0a0a]"
        >
          NEXT GEN <br />
          AI PLATFORM
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-8 max-w-[460px] text-[1.1rem] leading-[1.7] text-[#555]"
        >
          Build modern AI-powered experiences with immersive 3D interactions and
          animations.
        </motion.p>

        <Link href="/about">
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer rounded-full border-none bg-violet-500 px-[34px] py-3.5 text-base font-bold text-white shadow-[0_4px_20px_rgba(139,92,246,0.35)]"
          >
            Get Started
          </motion.button>
        </Link>
      </div>

      {/* ── RIGHT: 3D Canvas ── */}
      <div className="relative h-screen max-w-[50%] flex-[0_0_50%]">
        <Canvas camera={{ position: [0, 0, 6] }} className="h-full w-full">
          <ambientLight intensity={1} />
          <directionalLight position={[3, 2, 1]} />
          <Sphere />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
        </Canvas>
      </div>
    </section>
  );
}