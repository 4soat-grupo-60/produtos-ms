import { DbConnection } from "../../src/interfaces/dbconnection";
import { ProductUseCases } from "../../src/domain/usecases/product";
import { ProductController } from "../../src/controllers/product.controller";
import { ProductGateway } from "../../src/gateways/repositories/products";
import { Category } from "../../src/domain/value_object/category";

jest.mock("../../src/domain/usecases/product");
jest.mock("../../src/gateways/repositories/products");

describe("ProductController", () => {
  let mockDbConnection: DbConnection;

  beforeEach(() => {
    mockDbConnection = mockDbConnection;
  });

  it("Should get all products", async () => {
    const mockGetProducts = jest.spyOn(ProductUseCases, "list");
    mockGetProducts.mockResolvedValueOnce([]);

    const result = await ProductController.getAllProducts(mockDbConnection);

    expect(result).toEqual([]);
    expect(mockGetProducts).toHaveBeenCalledWith(expect.any(ProductGateway));
  });

  it("Should get product by category", async () => {
    const mockGetProduct = jest.spyOn(ProductUseCases, "listByCategory");
    mockGetProduct.mockResolvedValueOnce(null);

    const result = await ProductController.getAllProductsByCategory(
      new Category("Lanche"),
      mockDbConnection
    );

    expect(result).toBeNull();
    expect(mockGetProduct).toHaveBeenCalledWith(
      { category: "Lanche" },
      expect.any(ProductGateway)
    );
  });

  it("Should get all products", async () => {
    const mockGetProducts = jest.spyOn(ProductUseCases, "list");
    mockGetProducts.mockResolvedValueOnce([]);

    const result = await ProductController.getAllProducts(mockDbConnection);

    expect(result).toEqual([]);
    expect(mockGetProducts).toHaveBeenCalledWith(expect.any(ProductGateway));
  });

  it("Should delete product by ID", async () => {
    const mockGetProduct = jest.spyOn(ProductUseCases, "delete");
    mockGetProduct.mockResolvedValueOnce(null);

    const result = await ProductController.deleteProduct("1", mockDbConnection);
    expect(result).toBeNull();
    expect(mockGetProduct).toHaveBeenCalledWith(
      "1",
      expect.any(ProductGateway)
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});
