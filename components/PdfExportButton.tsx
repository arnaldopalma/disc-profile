'use client'

import { useState } from 'react'

interface Props {
  name: string
}

export default function PdfExportButton({ name }: Props) {
  const [loading, setLoading] = useState(false)

  async function handleExport() {
    setLoading(true)
    try {
      const { default: html2canvas } = await import('html2canvas')
      const { default: jsPDF } = await import('jspdf')

      const element = document.getElementById('result-content')!

      // Expand all <details> so content appears in the PDF
      const details = element.querySelectorAll('details')
      const prevOpen: boolean[] = []
      details.forEach((d, i) => {
        prevOpen[i] = d.open
        d.open = true
      })

      // Hide elements marked as PDF-only excluded
      const excluded = element.querySelectorAll<HTMLElement>('[data-pdf-exclude]')
      excluded.forEach((el) => (el.style.display = 'none'))

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#f9fafb',
      })

      // Restore state
      details.forEach((d, i) => (d.open = prevOpen[i]))
      excluded.forEach((el) => (el.style.display = ''))

      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })

      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()
      const imgHeight = (canvas.height * pageWidth) / canvas.width

      let position = 0
      pdf.addImage(imgData, 'PNG', 0, position, pageWidth, imgHeight)

      let heightLeft = imgHeight - pageHeight
      while (heightLeft > 0) {
        position -= pageHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, position, pageWidth, imgHeight)
        heightLeft -= pageHeight
      }

      pdf.save(`perfil-disc-${name.toLowerCase().replace(/\s+/g, '-')}.pdf`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleExport}
      disabled={loading}
      className={`shrink-0 text-sm font-medium px-4 py-2 rounded-xl border transition-colors ${
        loading
          ? 'border-gray-200 text-gray-400 cursor-not-allowed'
          : 'border-blue-200 text-blue-600 hover:bg-blue-50 cursor-pointer'
      }`}
    >
      {loading ? 'Gerando...' : 'Baixar PDF'}
    </button>
  )
}
