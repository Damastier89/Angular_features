export interface Environment {
  production: boolean,
  apiKey: string,
  fbDbUrl: string,
  limit: number, // Количество статей которые будут показаны на странице
}
