export interface MetadataExtractor {
  connect(): void;

  generateMetadata(): void;
}
