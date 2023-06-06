export interface Transaction {
  recordDate:string,
  tDescription:string,
  tType:string,
  category:string,
  subcategory:string,
  direction:string,
  amount:string,
  currency:string,
  submittedDateTime:string,
  submittedUser:string,
  deleted:string,
  parentRecordId:string
}

export interface ITransactionFilterData {
  userName?:string,
  currency?:string,
  closedDate?:string,
  amount?:string,
  type?:string,
  category?:string,
  subcategory?:string,
  dateFrom?:string,
  dateTo?:string,
  deleted?:boolean,
  pageIndex?: number,
  pageSize?: number,
}
