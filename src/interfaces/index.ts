export interface ProcessProps {        
    id: string,
    company_id: string,
    family_id: string,
    list_emails_responsables: [string],
    process_name: string,
  }
export interface FamiliesProps {      
  id: string,
  family_name: string,
  
  }
export interface CompaniesProps {
  id: string,
  company_name: string,
}

export interface AllProcessProps {
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