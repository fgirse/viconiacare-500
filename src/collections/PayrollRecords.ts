import type { CollectionConfig } from 'payload'

export const PayrollRecords: CollectionConfig = {
  slug: 'payroll-records',
  admin: {
    useAsTitle: 'periodLabel',
    group: 'Mitarbeiterverwaltung',
    defaultColumns: ['employee', 'periodLabel', 'grossPay', 'netPay', 'status'],
  },
  labels: {
    singular: { de: 'Lohnabrechnung', en: 'Payroll Record' },
    plural: { de: 'Lohnabrechnungen', en: 'Payroll Records' },
  },
  access: {
    read: ({ req }) => {
      if (!req.user) return false
      return ['superadmin', 'admin'].includes(req.user.role)
    },
    create: ({ req }) => ['superadmin', 'admin'].includes(req.user?.role ?? ''),
    update: ({ req }) => ['superadmin', 'admin'].includes(req.user?.role ?? ''),
    delete: ({ req }) => req.user?.role === 'superadmin',
  },
  fields: [
    {
      name: 'employee',
      type: 'relationship',
      relationTo: 'employees',
      required: true,
      label: { de: 'Mitarbeiter', en: 'Employee' },
    },
    {
      type: 'row',
      fields: [
        { name: 'payPeriodFrom', type: 'date', required: true, label: { de: 'Abrechnungsmonat (von)', en: 'Period From' } },
        { name: 'payPeriodTo', type: 'date', required: true, label: { de: 'Abrechnungsmonat (bis)', en: 'Period To' } },
      ],
    },
    {
      name: 'periodLabel',
      type: 'text',
      admin: { hidden: true },
      hooks: {
        beforeChange: [({ siblingData }) => {
          if (siblingData.payPeriodFrom) {
            const d = new Date(siblingData.payPeriodFrom)
            return d.toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })
          }
          return ''
        }],
      },
    },
    {
      name: 'workingHours',
      type: 'group',
      label: { de: 'Arbeitsstunden', en: 'Working Hours' },
      fields: [
        { name: 'regular', type: 'number', label: { de: 'Regelstunden', en: 'Regular Hours' } },
        { name: 'overtime', type: 'number', label: { de: 'Überstunden', en: 'Overtime Hours' } },
        { name: 'nightShift', type: 'number', label: { de: 'Nachtdienste (h)', en: 'Night Shift (h)' } },
        { name: 'holiday', type: 'number', label: { de: 'Feiertagsstunden', en: 'Holiday Hours' } },
        { name: 'sick', type: 'number', label: { de: 'Krankenstunden', en: 'Sick Hours' } },
        { name: 'vacation', type: 'number', label: { de: 'Urlaubstage', en: 'Vacation Days' } },
      ],
    },
    {
      name: 'earnings',
      type: 'group',
      label: { de: 'Vergütung (€)', en: 'Earnings (€)' },
      fields: [
        { name: 'basePay', type: 'number', label: { de: 'Grundgehalt', en: 'Base Pay' } },
        { name: 'overtimePay', type: 'number', label: { de: 'Überstundenzuschlag', en: 'Overtime Pay' } },
        { name: 'nightShiftAllowance', type: 'number', label: { de: 'Nachtzuschlag', en: 'Night Allowance' } },
        { name: 'holidayAllowance', type: 'number', label: { de: 'Feiertagszuschlag', en: 'Holiday Allowance' } },
        { name: 'travelAllowance', type: 'number', label: { de: 'Fahrtkostenerstattung', en: 'Travel Allowance' } },
        { name: 'bonus', type: 'number', label: { de: 'Sonderzahlung', en: 'Bonus' } },
        { name: 'grossPay', type: 'number', required: true, label: { de: 'Bruttogehalt (€)', en: 'Gross Pay (€)' } },
      ],
    },
    {
      name: 'deductions',
      type: 'group',
      label: { de: 'Abzüge (€)', en: 'Deductions (€)' },
      fields: [
        { name: 'incomeTax', type: 'number', label: { de: 'Lohnsteuer', en: 'Income Tax' } },
        { name: 'churchTax', type: 'number', label: { de: 'Kirchensteuer', en: 'Church Tax' } },
        { name: 'solidaritySurcharge', type: 'number', label: { de: 'Solidaritätszuschlag', en: 'Solidarity Surcharge' } },
        { name: 'healthInsurance', type: 'number', label: { de: 'Krankenversicherung (AG)', en: 'Health Insurance (EE)' } },
        { name: 'pensionInsurance', type: 'number', label: { de: 'Rentenversicherung (AG)', en: 'Pension Insurance (EE)' } },
        { name: 'unemploymentInsurance', type: 'number', label: { de: 'Arbeitslosenversicherung', en: 'Unemployment Insurance' } },
        { name: 'nursingCareInsurance', type: 'number', label: { de: 'Pflegeversicherung', en: 'Long-term Care Insurance' } },
        { name: 'totalDeductions', type: 'number', label: { de: 'Gesamtabzüge', en: 'Total Deductions' } },
      ],
    },
    { name: 'netPay', type: 'number', label: { de: 'Nettogehalt (€)', en: 'Net Pay (€)' } },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      label: { de: 'Status', en: 'Status' },
      options: [
        { label: { de: 'Entwurf', en: 'Draft' }, value: 'draft' },
        { label: { de: 'Freigegeben', en: 'Approved' }, value: 'approved' },
        { label: { de: 'Ausgezahlt', en: 'Paid' }, value: 'paid' },
      ],
      admin: { position: 'sidebar' },
    },
    { name: 'payslipPdf', type: 'upload', relationTo: 'media', label: { de: 'Gehaltszettel (PDF)', en: 'Payslip (PDF)' } },
    { name: 'notes', type: 'textarea', label: { de: 'Anmerkungen', en: 'Notes' } },
  ],
  timestamps: true,
}
