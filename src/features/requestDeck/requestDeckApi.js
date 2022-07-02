import request, { gql } from "graphql-request";
import { useQuery } from "react-query";
import { API_URL } from "../../app/api";

export function useRequests() {
  return useQuery("requests", async () => {
    const {
      allRequests: { edges },
    } = await request(
      API_URL,
      gql`
        query allRequests {
          allRequests {
            edges {
              node {
                id
                categoryByCategoryId {
                  name
                }
                media
                subcategoryBySubcategoryId {
                  name
                }
              }
            }
          }
        }
      `
    );
    return edges;
  });
}

export function useRequestById(request_id) {
  return useQuery("requestById", async () => {
    const { requestById } = await request(
      API_URL,
      gql`
        query requestById($request_id: Int!) {
          requestById(id: $request_id) {
            id
            categoryByCategoryId {
              name
            }
            requestCharacteristicsByRequestId {
              edges {
                node {
                  initialValue
                  attributeByAttributeId {
                    name
                  }
                }
              }
            }
            media
            subcategoryBySubcategoryId {
              name
            }
          }
        }
      `,
      { request_id }
    );
    return requestById;
  });
}
