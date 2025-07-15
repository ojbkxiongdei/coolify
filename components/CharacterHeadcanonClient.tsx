'use client';

import React, { useState } from 'react';
import CharacterHeadcanonGenerator from '@/components/CharacterHeadcanonGenerator';

export default function CharacterHeadcanonClient() {
  const [generatedHeadcanons, setGeneratedHeadcanons] = useState<string>('');

  const handleHeadcanonsGenerated = (headcanons: string) => {
    setGeneratedHeadcanons(headcanons);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <CharacterHeadcanonGenerator onHeadcanonsGenerated={handleHeadcanonsGenerated} />
    </div>
  );
} 