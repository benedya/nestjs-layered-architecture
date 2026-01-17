export interface EntityManagerInterface {
  transaction(...entities: object[]): Promise<void>;
}
