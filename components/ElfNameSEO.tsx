"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Book, Users, Zap, TreePine, Moon, Sun, Waves, Snowflake, Eye } from "lucide-react";
import SEOImageGallery from './SEOImageGallery';

export default function ElfNameSEO() {
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Features */}
          <section>
            <h2 className="text-3xl font-bold text-center mb-8">Elf Name Generator Features</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <TreePine className="h-5 w-5 text-emerald-500" />
                    Multiple Elf Types
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Supports Wood Elves, Dark Elves, Half-Elves, High Elves, Moon Elves, Sun Elves, Wild Elves, Sea Elves, Snow Elves, Shadow Elves and more
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Sparkles className="h-5 w-5 text-purple-500" />
                    AI-Powered Generation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Using advanced AI technology to generate authentic fantasy names based on elven culture and traditions, each name comes with unique meanings and backgrounds
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Book className="h-5 w-5 text-blue-500" />
                    Background Stories
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Optional background story generation to add depth and personality to each elf name, perfect for character development
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Elf Types */}
          <section>
            <h2 className="text-3xl font-bold text-center mb-8">Supported Elf Types</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <TreePine className="h-6 w-6 text-emerald-500" />
                  <div>
                    <h3 className="font-semibold">Wood Elf</h3>
                    <p className="text-sm text-gray-600">Elves in harmony with nature, skilled in archery and forest magic</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Eye className="h-6 w-6 text-purple-500" />
                  <div>
                    <h3 className="font-semibold">Dark Elf (Drow)</h3>
                    <p className="text-sm text-gray-600">Underground dwelling elves with dark skin and silver-white hair</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Users className="h-6 w-6 text-orange-500" />
                  <div>
                    <h3 className="font-semibold">Half-Elf</h3>
                    <p className="text-sm text-gray-600">Mixed heritage of human and elf, embodying traits of both races</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Sparkles className="h-6 w-6 text-gold-500" />
                  <div>
                    <h3 className="font-semibold">High Elf</h3>
                    <p className="text-sm text-gray-600">Noble elves with powerful magical abilities and ancient history</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Moon className="h-6 w-6 text-blue-500" />
                  <div>
                    <h3 className="font-semibold">Moon Elf</h3>
                    <p className="text-sm text-gray-600">Nocturnal elves with silver hair and moonlight-like beauty</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Sun className="h-6 w-6 text-yellow-500" />
                  <div>
                    <h3 className="font-semibold">Sun Elf</h3>
                    <p className="text-sm text-gray-600">Golden-haired elves with light magic and healing abilities</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Zap className="h-6 w-6 text-green-500" />
                  <div>
                    <h3 className="font-semibold">Wild Elf</h3>
                    <p className="text-sm text-gray-600">Primitive elf race with the strongest connection to nature</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Waves className="h-6 w-6 text-cyan-500" />
                  <div>
                    <h3 className="font-semibold">Sea Elf</h3>
                    <p className="text-sm text-gray-600">Ocean-dwelling elves with aquatic abilities and sea magic</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Snowflake className="h-6 w-6 text-indigo-500" />
                  <div>
                    <h3 className="font-semibold">Snow Elf</h3>
                    <p className="text-sm text-gray-600">Elves living in cold regions with ice and snow magic</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Elf Character Examples Gallery */}
          <SEOImageGallery
            title="Elf Character Showcase"
            description="Explore different types of elf character designs to inspire your fantasy creations"
            images={[
              {
                url: "/seo-images/Wood Elf Ranger.png",
                alt: "Wood elf ranger character design for fantasy name generation",
                title: "Wood Elf Ranger",
                description: "Forest guardian with name: Silverleaf Moonwhisper, skilled in archery and nature magic"
              },
              {
                url: "/seo-images/Dark Elf Mage.png",
                alt: "Dark elf mage character design for fantasy gaming",
                title: "Dark Elf Mage",
                description: "Underground world mage with name: Vexara Shadowweaver, master of dark magic and illusions"
              },
              {
                url: "/seo-images/High Elf Noble.png",
                alt: "High elf noble character design for fantasy stories",
                title: "High Elf Noble",
                description: "Ancient royal bloodline elf with name: Goldenbrow Starcrown, possessing powerful magical talents"
              }
            ]}
          />

          {/* Usage Guide */}
          <section>
            <h2 className="text-3xl font-bold text-center mb-8">Usage Guide</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>D&D Players</CardTitle>
                  <CardDescription>Create perfect elf names for your Dungeons & Dragons characters</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Step 1</Badge>
                    <span className="text-sm">Choose your character&apos;s elf race and subrace</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Step 2</Badge>
                    <span className="text-sm">Set gender and name style preferences</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Step 3</Badge>
                    <span className="text-sm">Generate background stories to enhance character development</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Creative Writers</CardTitle>
                  <CardDescription>Create unique elf characters for your fantasy novels and stories</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Step 1</Badge>
                    <span className="text-sm">Select appropriate elf types based on story setting</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Step 2</Badge>
                    <span className="text-sm">Choose name types that match your work&apos;s style</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Step 3</Badge>
                    <span className="text-sm">Use background story feature to enrich character settings</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Are the generated names suitable for commercial use?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Yes, all elf names we generate are original and can be used for personal creation, game characters, novel writing, and other purposes.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">How do you ensure name authenticity?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Our AI system is trained on extensive fantasy literature and linguistic rules, generating names that follow traditional elven naming conventions.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">How many names can be generated at once?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    You can generate 3-10 names per session. You can generate multiple times to get more options. Each name includes pronunciation guide and meaning explanation.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Do names have text-to-speech functionality?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Yes, each generated name comes with text-to-speech functionality to help you understand the correct pronunciation.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Elf Name Categories */}
          <section>
            <h2 className="text-3xl font-bold text-center mb-8">Elf Name Generator Categories and Meanings</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Nature-Inspired Names</CardTitle>
                  <CardDescription>Names reflecting natural elements and forest life</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Silverleaf</span>
                      <span className="text-xs text-gray-500">Tree guardian</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Moonwhisper</span>
                      <span className="text-xs text-gray-500">Night wanderer</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Starweaver</span>
                      <span className="text-xs text-gray-500">Cosmic mage</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Windrunner</span>
                      <span className="text-xs text-gray-500">Swift traveler</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Noble Titles</CardTitle>
                  <CardDescription>Names of elvish nobility and aristocracy</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Goldenbrow</span>
                      <span className="text-xs text-gray-500">Royal lineage</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Crystalborn</span>
                      <span className="text-xs text-gray-500">Pure bloodline</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Thornheart</span>
                      <span className="text-xs text-gray-500">Warrior lord</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Stormcrown</span>
                      <span className="text-xs text-gray-500">Weather master</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Magical Names</CardTitle>
                  <CardDescription>Names with magical significance and power</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Spellsong</span>
                      <span className="text-xs text-gray-500">Enchantress</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Runekeeper</span>
                      <span className="text-xs text-gray-500">Magic scholar</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Dreamweaver</span>
                      <span className="text-xs text-gray-500">Mind mage</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Lightbringer</span>
                      <span className="text-xs text-gray-500">Divine caster</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Role-Playing Applications */}
          <section>
            <h2 className="text-3xl font-bold text-center mb-8">Elf Name Generator DnD Applications</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Dungeons & Dragons</CardTitle>
                  <CardDescription>Perfect for D&D campaigns and character creation</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Generate authentic elf names for your D&D characters across all official elf subraces. Our generator understands the lore and naming conventions of each subrace, creating names that fit perfectly into your campaign world and character backstories.
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-gray-50 rounded p-2">
                      <div className="text-sm font-medium">Wood Elf Ranger</div>
                      <div className="text-xs text-gray-600">Forest guardian names</div>
                    </div>
                    <div className="bg-gray-50 rounded p-2">
                      <div className="text-sm font-medium">High Elf Wizard</div>
                      <div className="text-xs text-gray-600">Scholarly magical names</div>
                    </div>
                    <div className="bg-gray-50 rounded p-2">
                      <div className="text-sm font-medium">Drow Rogue</div>
                      <div className="text-xs text-gray-600">Dark underground names</div>
                    </div>
                    <div className="bg-gray-50 rounded p-2">
                      <div className="text-sm font-medium">Half-Elf Bard</div>
                      <div className="text-xs text-gray-600">Artistic hybrid names</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Fantasy Literature</CardTitle>
                  <CardDescription>For authors and storytellers</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Create memorable elf characters for your fantasy novels, short stories, and world-building projects. Our generator provides names with rich backstories and cultural context to enhance your storytelling and character development.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Fantasy Novels</Badge>
                      <span className="text-sm">Epic fantasy character names</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Short Stories</Badge>
                      <span className="text-sm">Memorable protagonist names</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">World Building</Badge>
                      <span className="text-sm">Cultural naming conventions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Character Development</Badge>
                      <span className="text-sm">Names with personality</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Linguistic Features */}
          <section>
            <h2 className="text-3xl font-bold text-center mb-8">Elf Name Generator Linguistic Features</h2>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Elvish Language Patterns</CardTitle>
                  <CardDescription>Understanding the structure of elvish names</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Sindarin Influences</h4>
                      <p className="text-sm text-gray-600 mb-2">
                        Names inspired by Tolkien&apos;s Sindarin language, featuring flowing vowel sounds and nature-based meanings. Common prefixes include &quot;Gal-&quot; (light), &quot;Cel-&quot; (stream), and &quot;Mith-&quot; (grey).
                      </p>
                      <div className="space-y-1 text-xs">
                        <div>• Soft consonant clusters</div>
                        <div>• Melodic vowel combinations</div>
                        <div>• Nature-inspired elements</div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Quenya Patterns</h4>
                      <p className="text-sm text-gray-600 mb-2">
                        High elvish naming conventions with formal, noble sounds. Often feature &quot;Eru-&quot; (one), &quot;Tar-&quot; (high), and &quot;Gil-&quot; (star) as meaningful components.
                      </p>
                      <div className="space-y-1 text-xs">
                        <div>• Formal linguistic structure</div>
                        <div>• Noble-sounding combinations</div>
                        <div>• Cosmic and divine themes</div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">D&D Elvish</h4>
                      <p className="text-sm text-gray-600 mb-2">
                        Names following D&D lore and conventions, adapted for various elf subraces. Features unique patterns for wood elves, high elves, and drow cultures.
                      </p>
                      <div className="space-y-1 text-xs">
                        <div>• Subrace-specific patterns</div>
                        <div>• Cultural naming traditions</div>
                        <div>• Alignment-based influences</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Pronunciation Guide</CardTitle>
                  <CardDescription>How to pronounce elvish names correctly</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Vowel Sounds</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">a</span>
                          <span className="text-sm text-gray-600">as in &quot;father&quot;</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">e</span>
                          <span className="text-sm text-gray-600">as in &quot;bed&quot;</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">i</span>
                          <span className="text-sm text-gray-600">as in &quot;machine&quot;</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">o</span>
                          <span className="text-sm text-gray-600">as in &quot;more&quot;</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">u</span>
                          <span className="text-sm text-gray-600">as in &quot;moon&quot;</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Consonant Combinations</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">th</span>
                          <span className="text-sm text-gray-600">soft &quot;th&quot; sound</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">dh</span>
                          <span className="text-sm text-gray-600">voiced &quot;th&quot;</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">ng</span>
                          <span className="text-sm text-gray-600">as in &quot;sing&quot;</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">ch</span>
                          <span className="text-sm text-gray-600">as in &quot;loch&quot;</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">r</span>
                          <span className="text-sm text-gray-600">rolled &quot;r&quot;</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Gaming Communities */}
          <section>
            <h2 className="text-3xl font-bold text-center mb-8">Gaming Community Features</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">MMO Characters</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">
                    Generate unique elf names for massively multiplayer online games. Perfect for World of Warcraft, Elder Scrolls Online, Final Fantasy XIV, and other fantasy MMORPGs.
                  </p>
                  <div className="space-y-1 text-xs">
                    <div>• Server-appropriate names</div>
                    <div>• Lore-friendly conventions</div>
                    <div>• Unique identity creation</div>
                    <div>• Guild and clan names</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Tabletop RPGs</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">
                    Beyond D&D, create elf names for Pathfinder, Warhammer Fantasy, GURPS, and other tabletop role-playing systems. Adaptable to any fantasy setting.
                  </p>
                  <div className="space-y-1 text-xs">
                    <div>• System-neutral names</div>
                    <div>• Campaign-specific themes</div>
                    <div>• NPC name generation</div>
                    <div>• Quick reference guides</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Creative Writing</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">
                    For authors, screenwriters, and creative professionals working on fantasy projects. Generate names that enhance character development and world-building.
                  </p>
                  <div className="space-y-1 text-xs">
                    <div>• Character consistency</div>
                    <div>• Cultural authenticity</div>
                    <div>• Memorable protagonists</div>
                    <div>• Supporting character names</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Advanced Features */}
          <section>
            <h2 className="text-3xl font-bold text-center mb-8">Advanced Generator Features</h2>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Name Customization Engine</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Syllable Control</h4>
                      <p className="text-sm text-gray-600 mb-2">
                        Control the number of syllables in generated names. Choose from 1-5 syllables to create names that fit your specific needs, from short and memorable to long and elaborate.
                      </p>
                      <div className="grid grid-cols-5 gap-1 text-xs">
                        <div className="bg-gray-50 rounded p-1 text-center">1</div>
                        <div className="bg-gray-50 rounded p-1 text-center">2</div>
                        <div className="bg-gray-50 rounded p-1 text-center">3</div>
                        <div className="bg-gray-50 rounded p-1 text-center">4</div>
                        <div className="bg-gray-50 rounded p-1 text-center">5</div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Phonetic Patterns</h4>
                      <p className="text-sm text-gray-600 mb-2">
                        Select specific phonetic patterns for your elf names. Choose from flowing, harsh, melodic, or mystical sound patterns to match your character&apos;s personality.
                      </p>
                      <div className="grid grid-cols-2 gap-1 text-xs">
                        <div className="bg-gray-50 rounded p-1 text-center">Flowing</div>
                        <div className="bg-gray-50 rounded p-1 text-center">Harsh</div>
                        <div className="bg-gray-50 rounded p-1 text-center">Melodic</div>
                        <div className="bg-gray-50 rounded p-1 text-center">Mystical</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Cultural Variations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">Forest Cultures</h4>
                      <p className="text-xs text-gray-600">Wood elves, tree shepherds, forest guardians</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Mountain Clans</h4>
                      <p className="text-xs text-gray-600">High elves, stone singers, peak dwellers</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Coastal Tribes</h4>
                      <p className="text-xs text-gray-600">Sea elves, wave dancers, tide callers</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Desert Nomads</h4>
                      <p className="text-xs text-gray-600">Sun elves, sand walkers, dune riders</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Extended FAQ */}
          <section>
            <h2 className="text-3xl font-bold text-center mb-8">Dark Elf and Wood Elf Name Generator FAQ</h2>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">How authentic are the generated elf names?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Our AI elf name generator has been trained on extensive fantasy literature, linguistic patterns from Tolkien&apos;s works, D&D lore, and traditional fantasy naming conventions. Each name follows authentic elvish phonetic patterns and cultural meanings, ensuring they feel natural and believable in fantasy settings.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Can I use these names for commercial projects?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Yes, all generated elf names are original creations and can be used freely for personal projects, commercial games, published novels, tabletop RPG campaigns, and other creative works. The names are generated using AI algorithms that create unique combinations based on linguistic patterns.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">How do I choose the right elf type for my character?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Consider your character&apos;s background, personality, and role in your story or game. Wood elves are perfect for rangers and druids, while high elves suit wizards and nobles. Dark elves work well for rogues and mysterious characters. Sea elves are ideal for maritime adventures.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What makes a good elf name?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    A good elf name should be melodious, meaningful, and appropriate for the character&apos;s culture. Elvish names typically feature flowing vowel sounds, soft consonants, and nature-inspired meanings. They should be memorable with 2-4 syllables being ideal.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Elf Name Generator Types - Keyword Density Enhancement */}
          <section>
            <h2 className="text-3xl font-bold text-center mb-8">Elf Name Generator Collection</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Wood Elf Name Generator</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">
                    Our wood elf name generator creates authentic names for forest-dwelling elves. Perfect for rangers, druids, and nature-connected characters. The wood elf name generator produces names with natural elements and sylvan influences.
                  </p>
                  <div className="space-y-1 text-xs">
                    <div>• Nature-themed naming patterns</div>
                    <div>• Forest culture integration</div>
                    <div>• Wood elf name generator for D&D</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Dark Elf Name Generator</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">
                    Generate authentic drow names with our dark elf name generator. Perfect for underground campaigns and shadow-themed characters. The dark elf name generator creates names with mysterious and sometimes sinister undertones.
                  </p>
                  <div className="space-y-1 text-xs">
                    <div>• Underworld culture naming patterns</div>
                    <div>• Drow society integration</div>
                    <div>• Dark elf name generator for roleplaying</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Half Elf Name Generator</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">
                    Our half elf name generator blends human and elven naming traditions. Perfect for characters with mixed heritage and unique backgrounds. The half elf name generator creates versatile names fitting multiple settings.
                  </p>
                  <div className="space-y-1 text-xs">
                    <div>• Cultural fusion naming patterns</div>
                    <div>• Adaptable to various campaigns</div>
                    <div>• Half elf name generator for diverse stories</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Blood Elf Name Generator</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">
                    Create majestic and powerful names with our blood elf name generator. Perfect for high-fantasy settings and arcane-influenced characters. The blood elf name generator produces names with elegant yet potent qualities.
                  </p>
                  <div className="space-y-1 text-xs">
                    <div>• Arcane-influenced naming patterns</div>
                    <div>• Magical heritage integration</div>
                    <div>• Blood elf name generator for fantasy gaming</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Elf Names Generator</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">
                    Our comprehensive elf names generator covers all types of elven cultures. This elf names generator creates authentic fantasy names suited for any setting or story. Use our elf names generator for instant character creation.
                  </p>
                  <div className="space-y-1 text-xs">
                    <div>• Universal elven naming patterns</div>
                    <div>• Multi-cultural elven integration</div>
                    <div>• Elf names generator for all character types</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Elf Name Generator DnD</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">
                    Our specialized elf name generator DnD creates names perfectly aligned with Dungeons & Dragons lore. This elf name generator DnD integrates with official race descriptions and naming conventions from the Player&apos;s Handbook.
                  </p>
                  <div className="space-y-1 text-xs">
                    <div>• D&D rulebook compliant names</div>
                    <div>• Campaign setting appropriate</div>
                    <div>• Elf name generator DnD for authentic gameplay</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Technical Features */}
          <section>
            <h2 className="text-3xl font-bold text-center mb-8">Technical Features</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">AI-Powered</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Based on latest GPT-4 technology, ensuring generated names are both traditional and creative. Advanced AI algorithms analyze linguistic patterns, cultural contexts, and fantasy literature to create authentic elvish names.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Multi-Language Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Supports various elvish language styles including Sindarin, Quenya and other Tolkien language families. Generate names with pronunciation guides in multiple languages for authentic fantasy experiences.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Instant Generation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Fast response time, generating high-quality elf names and background stories within seconds. Perfect for dungeon masters, authors, and gamers who need quick character creation tools.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center bg-gray-50 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Create Your Perfect Elf Name Today</h2>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              Use our elf name generator, including specialized wood elf name generator, dark elf name generator, and half elf name generator tools. Perfect for DnD characters, RPG campaigns, and creative writing projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Try Elf Name Generator Now
              </button>
              <a href="/character-headcanon-generator" className="bg-gray-200 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
                Create Character Stories
              </a>
            </div>
          </section>
        </div>
      </div>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
                            "name": "Elf Name Generator",
                "description": "Generate authentic fantasy elf names with our wood elf name generator, dark elf name generator, half elf name generator, blood elf name generator, and elf name generator dnd tools.",
            "url": "https://dreamfinityx.com/elf-name-generator",
            "applicationCategory": "GamingApplication",
            "operatingSystem": "Any",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "creator": {
              "@type": "Organization",
              "name": "DreamfinityX"
            },
            "keywords": "elf name generator, half elf name generator, wood elf name generator, dark elf name generator, elf names generator, elf name generator dnd, blood elf name generator"
          })
        }}
      />
    </div>
  );
}