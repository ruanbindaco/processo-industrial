export interface ProcessProps {
    processes: [
        {
        id: string,
        company_id: string,
        family_id: string,
        list_emails_responsables: [string],
        process_name: string,
        }
      ],
      families: [
        {
          id: string,
          family_name: string,
        }
      ],
      companies: [
        {
          id: string,
          company_name: string,
        }
      ]
  }