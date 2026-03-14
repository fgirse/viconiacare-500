import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Upload, FileText, User, AlertCircle } from 'lucide-react'
import { PatientDocumentUpload } from '@/components/dashboard/patient/PatientDocumentUpload'

export default function PatientDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Mein Patienten-Dashboard</h2>
        <p className="text-muted-foreground">Ihre persönlichen Daten und Dokumente</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile summary */}
        <Card className="lg:col-span-1 shadow-sm border-0 bg-white">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <User className="h-4 w-4" />
              Mein Profil
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-center py-6">
              <div className="h-20 w-20 rounded-full bg-viconia-100 flex items-center justify-center text-3xl font-bold text-viconia-700">
                P
              </div>
            </div>
            <div className="space-y-2 text-sm">
              {[
                { label: 'Pflegegrad', value: '—' },
                { label: 'Kostenträger', value: '—' },
                { label: 'Zuständige Pflegekraft', value: '—' },
                { label: 'Pflegebeginn', value: '—' },
              ].map((row) => (
                <div key={row.label} className="flex justify-between py-1 border-b border-gray-50">
                  <span className="text-muted-foreground">{row.label}</span>
                  <span className="font-medium text-gray-900">{row.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Documents */}
        <Card className="lg:col-span-2 shadow-sm border-0 bg-white">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Meine Dokumente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <PatientDocumentUpload />
          </CardContent>
        </Card>
      </div>

      {/* Appointments */}
      <Card className="shadow-sm border-0 bg-white">
        <CardHeader>
          <CardTitle className="text-base">Meine Termine</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground text-center py-8">
            Keine bevorstehenden Termine
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
