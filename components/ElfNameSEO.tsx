"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Book, Users, Zap, TreePine, Moon, Sun, Waves, Snowflake, Eye } from "lucide-react";

export default function ElfNameSEO() {
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-12">
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
                    Based on latest GPT-4 technology, ensuring generated names are both traditional and creative
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Multi-Language Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Supports various elvish language styles including Sindarin, Quenya and other Tolkien language families
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Instant Generation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Fast response time, generating high-quality elf names and background stories within seconds
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}