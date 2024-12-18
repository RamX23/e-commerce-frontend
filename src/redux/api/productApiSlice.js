import { PRODUCT_URL } from "./constants";
import { UPLOAD_URL } from "./constants";
import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ keyword }) => ({
        url: `${PRODUCT_URL}`,
        params: { keyword },
        credentials: 'include', // Add credentials for cookie handling
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Product"],
    }),
    getProductById: builder.query({
      query: (productId) => ({
        url: `${PRODUCT_URL}/${productId}`,
        credentials: 'include', // Add credentials for cookie handling
      }),
      providesTags: (result, error, productId) => [
        { type: "Product", id: productId },
      ],
    }),
    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}`,
        method: "POST",
        body: data,
        credentials: 'include', // Add credentials for cookie handling
      }),
    }),
    getAllProducts: builder.query({
      query: () => ({
        url: `${PRODUCT_URL}/fetchallproducts`,
        credentials: 'include', // Add credentials for cookie handling
      }),
    }),
    getProductDetails: builder.query({
      query: (productId) => ({
        url: `${PRODUCT_URL}/${productId}`,
        credentials: 'include', // Add credentials for cookie handling
      }),
      keepUnusedDataFor: 5,
    }),
    createProduct: builder.mutation({
      query: (productData) => ({
        url: `${PRODUCT_URL}`,
        method: "POST",
        body: productData,
        credentials: 'include', // Add credentials for cookie handling
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation({
      query: ({ productId, formData }) => ({
        url: `${PRODUCT_URL}/${productId}`,
        method: "PUT",
        body: formData,
        credentials: 'include', // Add credentials for cookie handling
      }),
    }),
    deleteProduct: builder.mutation({
      query: ({ productId }) => ({
        url: `${PRODUCT_URL}/${productId}`,
        method: "DELETE",
        credentials: 'include', // Add credentials for cookie handling
      }),
      providesTags: ["Product"],
    }),
    createReview: builder.mutation({
      query: (data) => ({
        url: `${PRODUCT_URL}/${data.productId}/reviews`,
        method: "POST",
        body: data,
        credentials: 'include', // Add credentials for cookie handling
      }),
    }),
    getTopProducts: builder.query({
      query: () => ({
        url: `${PRODUCT_URL}/top`,
        credentials: 'include', // Add credentials for cookie handling
      }),
      keepUnusedDataFor: 5,
    }),
    getNewProducts: builder.query({
      query: () => ({
        url: `${PRODUCT_URL}/new`,
        keepUnusedDataFor: 5,
        credentials: 'include', // Add credentials for cookie handling
      }),
    }),
    getFilteredProducts: builder.query({
      query: ({ checked, radio }) => ({
        url: `${PRODUCT_URL}/filtered-products`,
        method: "POST",
        body: { checked, radio },
        credentials: 'include', // Add credentials for cookie handling
      }),
    }),
  }),
});

export const {
  useGetProductByIdQuery,
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useGetAllProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useCreateReviewMutation,
  useGetTopProductsQuery,
  useGetNewProductsQuery,
  useUploadProductImageMutation,
  useGetFilteredProductsQuery,
} = productApiSlice;
