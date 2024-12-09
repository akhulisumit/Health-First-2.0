import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink } from 'lucide-react'

export default function SymptomsAnalyzer() {
  const analyzerUrl = "https://frolicking-druid-0637f2.netlify.app/"

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Symptoms Analyzer</h1>
      <Card>
        <CardHeader>
          <CardTitle>Analyze Your Symptoms</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Click the button below to open our Symptoms Analyzer tool in a new tab.</p>
          <Button 
            onClick={() => window.open(analyzerUrl, '_blank')}
            className="w-full sm:w-auto"
          >
            Open Symptoms Analyzer
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

