"use client";

import { useState, useEffect } from "react";
import ElfNameGenerator from "@/components/ElfNameGenerator";
import { Suspense } from "react";

// 动态导入SEO组件以优化首屏加载
const ElfNameSEO = dynamic(() => import("@/components/ElfNameSEO"), {
  ssr: false,
});

import dynamic from "next/dynamic";

export default function ElfNamePage() {
  const [showSEO, setShowSEO] = useState(false);

  useEffect(() => {
    // 使用Intersection Observer来检测用户是否滚动到页面底部
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShowSEO(true);
          }
        });
      },
      {
        rootMargin: "200px", // 提前200px触发
      }
    );

    const trigger = document.createElement("div");
    trigger.style.height = "1px";
    trigger.style.position = "absolute";
    trigger.style.bottom = "50%";
    trigger.style.left = "0";
    trigger.style.width = "100%";
    trigger.style.pointerEvents = "none";
    
    document.body.appendChild(trigger);
    observer.observe(trigger);

    return () => {
      observer.disconnect();
      if (document.body.contains(trigger)) {
        document.body.removeChild(trigger);
      }
    };
  }, []);

  return (
    <div className="min-h-screen">
      <ElfNameGenerator />
      
      {/* 懒加载SEO内容 */}
      {showSEO && (
        <Suspense fallback={<div className="h-4" />}>
          <ElfNameSEO />
        </Suspense>
      )}
    </div>
  );
}