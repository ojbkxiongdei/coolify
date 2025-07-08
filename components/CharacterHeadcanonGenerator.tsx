'use client'

import React, { useState } from 'react'
import { useUser } from '@/lib/hooks/useUser'
import { Button } from '@/components/ui/button'

interface CharacterHeadcanonGeneratorProps {
  onHeadcanonsGenerated?: (headcanons: string) => void
}

// 配置选项数据
const GENDER_OPTIONS = [
  { value: '', label: 'Select Gender' },
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'non-binary', label: 'Non-binary' },
  { value: 'gender-fluid', label: 'Gender-fluid' },
  { value: 'agender', label: 'Agender' },
  { value: 'transgender', label: 'Transgender' },
  { value: 'demigirl', label: 'Demigirl' },
  { value: 'demiboy', label: 'Demiboy' },
  { value: 'bigender', label: 'Bigender' },
  { value: 'pangender', label: 'Pangender' },
  { value: 'genderqueer', label: 'Genderqueer' },
  { value: 'two-spirit', label: 'Two-spirit' },
  { value: 'other', label: 'Other' },
  { value: 'prefer-not-to-say', label: 'Prefer not to say' }
]

const STORY_STYLE_OPTIONS = [
  { value: '', label: 'Select Story Style' },
  { value: 'romance', label: 'Romance' },
  { value: 'adventure', label: 'Adventure' },
  { value: 'mystery', label: 'Mystery' },
  { value: 'horror', label: 'Horror' },
  { value: 'comedy', label: 'Comedy' },
  { value: 'drama', label: 'Drama' },
  { value: 'fantasy', label: 'Fantasy' },
  { value: 'sci-fi', label: 'Science Fiction' },
  { value: 'slice-of-life', label: 'Slice of Life' },
  { value: 'thriller', label: 'Thriller' },
  { value: 'historical', label: 'Historical' },
  { value: 'contemporary', label: 'Contemporary' },
  { value: 'dystopian', label: 'Dystopian' },
  { value: 'utopian', label: 'Utopian' },
  { value: 'dark', label: 'Dark' },
  { value: 'light-hearted', label: 'Light-hearted' },
  { value: 'melodramatic', label: 'Melodramatic' },
  { value: 'satirical', label: 'Satirical' },
  { value: 'surreal', label: 'Surreal' },
  { value: 'realistic', label: 'Realistic' }
]

const WRITING_STYLE_OPTIONS = [
  { value: '', label: 'Select Writing Style' },
  { value: 'descriptive', label: 'Descriptive' },
  { value: 'dialogue-heavy', label: 'Dialogue-heavy' },
  { value: 'action-packed', label: 'Action-packed' },
  { value: 'introspective', label: 'Introspective' },
  { value: 'poetic', label: 'Poetic' },
  { value: 'minimalist', label: 'Minimalist' },
  { value: 'verbose', label: 'Verbose' },
  { value: 'humorous', label: 'Humorous' },
  { value: 'serious', label: 'Serious' },
  { value: 'casual', label: 'Casual' },
  { value: 'formal', label: 'Formal' },
  { value: 'stream-of-consciousness', label: 'Stream of consciousness' },
  { value: 'epistolary', label: 'Epistolary' },
  { value: 'first-person', label: 'First person' },
  { value: 'third-person', label: 'Third person' },
  { value: 'omniscient', label: 'Omniscient' },
  { value: 'limited', label: 'Limited' },
  { value: 'present-tense', label: 'Present tense' },
  { value: 'past-tense', label: 'Past tense' },
  { value: 'experimental', label: 'Experimental' }
]

const CHARACTER_TYPE_OPTIONS = [
  { value: '', label: 'Select Character Type' },
  { value: 'protagonist', label: 'Protagonist' },
  { value: 'antagonist', label: 'Antagonist' },
  { value: 'anti-hero', label: 'Anti-hero' },
  { value: 'mentor', label: 'Mentor' },
  { value: 'sidekick', label: 'Sidekick' },
  { value: 'love-interest', label: 'Love interest' },
  { value: 'comic-relief', label: 'Comic relief' },
  { value: 'tragic-hero', label: 'Tragic hero' },
  { value: 'villain', label: 'Villain' },
  { value: 'supporting-character', label: 'Supporting character' },
  { value: 'foil', label: 'Foil' },
  { value: 'deuteragonist', label: 'Deuteragonist' },
  { value: 'tritagonist', label: 'Tritagonist' },
  { value: 'ensemble-cast', label: 'Ensemble cast member' },
  { value: 'narrator', label: 'Narrator' },
  { value: 'mysterious-figure', label: 'Mysterious figure' },
  { value: 'wise-elder', label: 'Wise elder' },
  { value: 'rebel', label: 'Rebel' },
  { value: 'leader', label: 'Leader' },
  { value: 'innocent', label: 'Innocent' }
]

const AGE_RANGE_OPTIONS = [
  { value: '', label: 'Select Age Range' },
  { value: 'child', label: 'Child (0-12)' },
  { value: 'teen', label: 'Teen (13-19)' },
  { value: 'young-adult', label: 'Young adult (20-29)' },
  { value: 'adult', label: 'Adult (30-49)' },
  { value: 'middle-aged', label: 'Middle-aged (50-64)' },
  { value: 'senior', label: 'Senior (65+)' },
  { value: 'elderly', label: 'Elderly (75+)' },
  { value: 'immortal', label: 'Immortal/Ageless' },
  { value: 'variable', label: 'Variable' },
  { value: 'custom', label: 'Custom' }
]

const PERSONALITY_ARCHETYPE_OPTIONS = [
  { value: '', label: 'Select Personality Archetype' },
  { value: 'the-innocent', label: 'The Innocent' },
  { value: 'the-everyman', label: 'The Everyman' },
  { value: 'the-hero', label: 'The Hero' },
  { value: 'the-outlaw', label: 'The Outlaw' },
  { value: 'the-explorer', label: 'The Explorer' },
  { value: 'the-creator', label: 'The Creator' },
  { value: 'the-ruler', label: 'The Ruler' },
  { value: 'the-magician', label: 'The Magician' },
  { value: 'the-lover', label: 'The Lover' },
  { value: 'the-caregiver', label: 'The Caregiver' },
  { value: 'the-jester', label: 'The Jester' },
  { value: 'the-sage', label: 'The Sage' },
  { value: 'the-seeker', label: 'The Seeker' },
  { value: 'the-destroyer', label: 'The Destroyer' },
  { value: 'the-transformer', label: 'The Transformer' },
  { value: 'the-warrior', label: 'The Warrior' },
  { value: 'the-orphan', label: 'The Orphan' },
  { value: 'the-visionary', label: 'The Visionary' },
  { value: 'the-guardian', label: 'The Guardian' },
  { value: 'the-trickster', label: 'The Trickster' }
]

const BACKGROUND_ORIGIN_OPTIONS = [
  { value: '', label: 'Select Background/Origin' },
  { value: 'noble', label: 'Noble/Aristocratic' },
  { value: 'working-class', label: 'Working class' },
  { value: 'middle-class', label: 'Middle class' },
  { value: 'wealthy', label: 'Wealthy' },
  { value: 'poor', label: 'Poor/Impoverished' },
  { value: 'orphan', label: 'Orphan' },
  { value: 'rural', label: 'Rural/Country' },
  { value: 'urban', label: 'Urban/City' },
  { value: 'suburban', label: 'Suburban' },
  { value: 'immigrant', label: 'Immigrant' },
  { value: 'military', label: 'Military family' },
  { value: 'academic', label: 'Academic family' },
  { value: 'artistic', label: 'Artistic family' },
  { value: 'criminal', label: 'Criminal background' },
  { value: 'religious', label: 'Religious community' },
  { value: 'isolated', label: 'Isolated/Secluded' },
  { value: 'nomadic', label: 'Nomadic' },
  { value: 'foreign', label: 'Foreign culture' },
  { value: 'supernatural', label: 'Supernatural origin' },
  { value: 'mysterious', label: 'Mysterious/Unknown' }
]

const RELATIONSHIP_STATUS_OPTIONS = [
  { value: '', label: 'Select Relationship Status' },
  { value: 'single', label: 'Single' },
  { value: 'taken', label: 'In a relationship' },
  { value: 'married', label: 'Married' },
  { value: 'divorced', label: 'Divorced' },
  { value: 'widowed', label: 'Widowed' },
  { value: 'complicated', label: 'It\'s complicated' },
  { value: 'polyamorous', label: 'Polyamorous' },
  { value: 'aromantic', label: 'Aromantic' },
  { value: 'asexual', label: 'Asexual' },
  { value: 'dating', label: 'Dating' },
  { value: 'engaged', label: 'Engaged' },
  { value: 'separated', label: 'Separated' },
  { value: 'open-relationship', label: 'Open relationship' },
  { value: 'long-distance', label: 'Long-distance relationship' },
  { value: 'unrequited', label: 'Unrequited love' },
  { value: 'forbidden', label: 'Forbidden relationship' },
  { value: 'casual', label: 'Casual dating' },
  { value: 'secret', label: 'Secret relationship' },
  { value: 'past-trauma', label: 'Past relationship trauma' },
  { value: 'not-interested', label: 'Not interested in romance' }
]

const OCCUPATION_OPTIONS = [
  { value: '', label: 'Select Occupation/Role' },
  { value: 'student', label: 'Student' },
  { value: 'teacher', label: 'Teacher/Professor' },
  { value: 'doctor', label: 'Doctor/Healer' },
  { value: 'warrior', label: 'Warrior/Fighter' },
  { value: 'artist', label: 'Artist/Creative' },
  { value: 'scientist', label: 'Scientist/Researcher' },
  { value: 'leader', label: 'Leader/Ruler' },
  { value: 'merchant', label: 'Merchant/Trader' },
  { value: 'craftsperson', label: 'Craftsperson/Artisan' },
  { value: 'entertainer', label: 'Entertainer/Performer' },
  { value: 'explorer', label: 'Explorer/Adventurer' },
  { value: 'guard', label: 'Guard/Security' },
  { value: 'spy', label: 'Spy/Agent' },
  { value: 'criminal', label: 'Criminal/Thief' },
  { value: 'farmer', label: 'Farmer/Agricultural' },
  { value: 'servant', label: 'Servant/Domestic' },
  { value: 'priest', label: 'Priest/Religious' },
  { value: 'noble', label: 'Noble/Aristocrat' },
  { value: 'unemployed', label: 'Unemployed' },
  { value: 'retired', label: 'Retired' },
  { value: 'freelancer', label: 'Freelancer' },
  { value: 'inventor', label: 'Inventor/Engineer' },
  { value: 'diplomat', label: 'Diplomat/Ambassador' },
  { value: 'judge', label: 'Judge/Legal' },
  { value: 'detective', label: 'Detective/Investigator' }
]

export default function CharacterHeadcanonGenerator({ onHeadcanonsGenerated }: CharacterHeadcanonGeneratorProps) {
  const { user } = useUser()
  const [isGenerating, setIsGenerating] = useState(false)
  
  // 折叠状态
  const [isCharacterDetailsExpanded, setIsCharacterDetailsExpanded] = useState(false)
  const [isStyleSettingsExpanded, setIsStyleSettingsExpanded] = useState(false)
  
  // 所有配置状态
  const [characterName, setCharacterName] = useState('')
  const [gender, setGender] = useState('')
  const [storyStyle, setStoryStyle] = useState('')
  const [writingStyle, setWritingStyle] = useState('')
  const [characterType, setCharacterType] = useState('')
  const [ageRange, setAgeRange] = useState('')
  const [personalityArchetype, setPersonalityArchetype] = useState('')
  const [backgroundOrigin, setBackgroundOrigin] = useState('')
  const [relationshipStatus, setRelationshipStatus] = useState('')
  const [occupation, setOccupation] = useState('')
  const [traits, setTraits] = useState('')
  const [length, setLength] = useState('medium')
  const [style, setStyle] = useState('detailed')
  
  const [generatedHeadcanons, setGeneratedHeadcanons] = useState('')
  const [error, setError] = useState('')
  const [generationInfo, setGenerationInfo] = useState<{
    creditsConsumed: number
    remainingCredits: number | null
    isFreeGeneration?: boolean
  } | null>(null)

  const handleGenerate = async () => {
    // 检查是否至少有一个配置
    if (!characterName && !gender && !storyStyle && !writingStyle && !characterType && !ageRange && !personalityArchetype && !backgroundOrigin && !relationshipStatus && !occupation && !traits.trim()) {
      setError('Please provide at least some character details to generate headcanons')
      return
    }

    setIsGenerating(true)
    setError('')
    setGeneratedHeadcanons('')
    setGenerationInfo(null)

    try {
      const traitsArray = traits.split(',').map(t => t.trim()).filter(t => t)
      
      const response = await fetch('/api/character-headcanon', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          characterName,
          gender,
          storyStyle,
          writingStyle,
          characterType,
          ageRange,
          personalityArchetype,
          backgroundOrigin,
          relationshipStatus,
          occupation,
          traits: traitsArray,
          length,
          style,
          user: user?.id
        }),
      })

      const data = await response.json()

      if (data.success) {
        setGeneratedHeadcanons(data.headcanons)
        setGenerationInfo({
          creditsConsumed: data.creditsConsumed,
          remainingCredits: data.remainingCredits,
          isFreeGeneration: data.isFreeGeneration
        })
        onHeadcanonsGenerated?.(data.headcanons)
      } else {
        setError(data.error || 'Failed to generate character headcanons')
      }
    } catch (error) {
      console.error('Network error:', error)
      setError('Network error, please try again')
    } finally {
      setIsGenerating(false)
    }
  }

  const renderSelectField = (
    label: string,
    value: string,
    onChange: (value: string) => void,
    options: Array<{ value: string; label: string }>,
    required = false
  ) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-3 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 bg-white text-sm appearance-none"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3e%3cpath stroke=\'%236b7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3e%3c/svg%3e")', backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )

  return (
    <div className="max-w-6xl mx-auto">
      {/* Generator Form */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="mb-6">
          <div className="mb-3 p-3 bg-green-50 border border-green-200 rounded-md">
            <p className="text-sm text-green-700 font-medium">
              🎉 Free Beta Period - All generations are completely free!
            </p>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Generate Character Headcanons</h2>
          <p className="text-sm text-gray-600">
            Create detailed character headcanons with extensive customization options
          </p>
        </div>

        {/* Basic Character Info */}
        <div className="mb-6">
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Character Name (Optional)
              </label>
              <input
                type="text"
                value={characterName}
                onChange={(e) => setCharacterName(e.target.value)}
                placeholder="e.g., Hermione Granger"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-sm"
              />
            </div>
            {renderSelectField('Gender', gender, setGender, GENDER_OPTIONS)}
          </div>
        </div>

        {/* Character Details */}
        <div className="mb-6">
          <div className="mb-4">
            <button
              type="button"
              onClick={() => setIsCharacterDetailsExpanded(!isCharacterDetailsExpanded)}
              className="w-full flex items-center justify-between hover:bg-gray-50 transition-colors rounded-lg p-2 -m-2"
            >
              <h3 className="text-lg font-medium text-gray-900">Character Details (Optional)</h3>
              <svg
                className={`w-5 h-5 text-gray-500 transform transition-transform ${
                  isCharacterDetailsExpanded ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
          
          {isCharacterDetailsExpanded && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {renderSelectField('Character Type', characterType, setCharacterType, CHARACTER_TYPE_OPTIONS)}
              {renderSelectField('Age Range', ageRange, setAgeRange, AGE_RANGE_OPTIONS)}
              {renderSelectField('Personality Archetype', personalityArchetype, setPersonalityArchetype, PERSONALITY_ARCHETYPE_OPTIONS)}
              {renderSelectField('Background/Origin', backgroundOrigin, setBackgroundOrigin, BACKGROUND_ORIGIN_OPTIONS)}
              {renderSelectField('Relationship Status', relationshipStatus, setRelationshipStatus, RELATIONSHIP_STATUS_OPTIONS)}
              {renderSelectField('Occupation/Role', occupation, setOccupation, OCCUPATION_OPTIONS)}
            </div>
          )}
        </div>

        {/* Style Settings */}
        <div className="mb-6">
          <div className="mb-4">
            <button
              type="button"
              onClick={() => setIsStyleSettingsExpanded(!isStyleSettingsExpanded)}
              className="w-full flex items-center justify-between hover:bg-gray-50 transition-colors rounded-lg p-2 -m-2"
            >
              <h3 className="text-lg font-medium text-gray-900">Style Settings (Optional)</h3>
              <svg
                className={`w-5 h-5 text-gray-500 transform transition-transform ${
                  isStyleSettingsExpanded ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
          
          {isStyleSettingsExpanded && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderSelectField('Story Style', storyStyle, setStoryStyle, STORY_STYLE_OPTIONS)}
              {renderSelectField('Writing Style', writingStyle, setWritingStyle, WRITING_STYLE_OPTIONS)}
            </div>
          )}
        </div>

        {/* Generation Settings */}
        <div className="mb-6">
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-900">Generation Settings</h3>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content Length
                </label>
                <select
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  className="w-full p-3 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 bg-white text-sm appearance-none"
                  style={{ backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3e%3cpath stroke=\'%236b7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3e%3c/svg%3e")', backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
                >
                  <option value="short">Short</option>
                  <option value="medium">Medium</option>
                  <option value="long">Long</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Generation Style
                </label>
                <select
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  className="w-full p-3 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 bg-white text-sm appearance-none"
                  style={{ backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3e%3cpath stroke=\'%236b7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3e%3c/svg%3e")', backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
                >
                  <option value="detailed">Detailed</option>
                  <option value="creative">Creative</option>
                  <option value="analytical">Analytical</option>
                </select>
              </div>
            </div>

            {/* Additional Requirements */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Requirements
              </label>
              <input
                type="text"
                value={traits}
                onChange={(e) => setTraits(e.target.value)}
                placeholder="e.g., focus on relationships, include backstory, specific personality traits"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-sm"
              />
              <p className="text-xs text-gray-500 mt-1">
                Specify any additional requirements or focus areas for the headcanons
              </p>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Generate Button */}
        <Button
          onClick={handleGenerate}
          disabled={isGenerating || !user}
          className="w-full bg-gray-900 text-white hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Generating Headcanons...
            </>
          ) : (
            'Generate Character Headcanons'
          )}
        </Button>

        {!user && (
          <p className="text-xs text-gray-500 mt-2 text-center">
            Please sign in to generate character headcanons
          </p>
        )}
      </div>

      {/* Results */}
      {generatedHeadcanons && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              Generated Character Headcanons
            </h3>
            {generationInfo && (
              <div className="text-sm text-gray-600">
                {generationInfo.isFreeGeneration ? (
                  <span className="text-green-600">✓ Free generation - no credits used</span>
                ) : (
                  <>
                    <span className="text-green-600">✓</span> {generationInfo.creditsConsumed} credits used
                    • {generationInfo.remainingCredits} remaining
                  </>
                )}
              </div>
            )}
          </div>

          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {characterName || 'Generated Character'}
              </span>
              {gender && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {GENDER_OPTIONS.find(g => g.value === gender)?.label}
                </span>
              )}
              {characterType && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {CHARACTER_TYPE_OPTIONS.find(c => c.value === characterType)?.label}
                </span>
              )}
              {ageRange && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {AGE_RANGE_OPTIONS.find(a => a.value === ageRange)?.label}
                </span>
              )}
              {storyStyle && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {STORY_STYLE_OPTIONS.find(s => s.value === storyStyle)?.label}
                </span>
              )}
              {writingStyle && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {WRITING_STYLE_OPTIONS.find(w => w.value === writingStyle)?.label}
                </span>
              )}
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                {length} length
              </span>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                {style} style
              </span>
            </div>
          </div>

          <div className="prose max-w-none">
            <div className="bg-gray-50 rounded-lg p-4">
              <pre className="whitespace-pre-wrap text-sm text-gray-700 font-normal">
                {generatedHeadcanons}
              </pre>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <Button
              onClick={() => navigator.clipboard.writeText(generatedHeadcanons)}
              variant="outline"
              className="text-gray-600 border-gray-300 hover:bg-gray-50"
            >
              Copy to Clipboard
            </Button>
            <Button
              onClick={() => {
                setGeneratedHeadcanons('')
                setGenerationInfo(null)
                setError('')
              }}
              variant="outline"
              className="text-gray-600 border-gray-300 hover:bg-gray-50"
            >
              Clear Results
            </Button>
          </div>
        </div>
      )}
    </div>
  )
} 