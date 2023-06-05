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
  userName:string,
  currency:string,
  closedDate:string,
  type:string,
  category:string,
  subcategory:string,
  dateFrom:string,
  dateTo:string,
  deleted:string,
  pageIndex: number,
  pageSize: number,
}
