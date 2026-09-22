type D1Database = {
  prepare(query: string): {
    bind(...values: unknown[]): {
      first<T>(): Promise<T | null>;
      run(): Promise<unknown>;
    };
    first<T>(): Promise<T | null>;
  };
};

type PagesFunction<Environment = unknown> = (context: {
  request: Request;
  env: Environment;
}) => Response | Promise<Response>;
