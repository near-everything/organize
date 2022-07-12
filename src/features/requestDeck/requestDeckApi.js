import { gql } from "graphql-request";
import { useQuery } from "react-query";
import { graphqlClient } from "../../app/api";

export function useRequests() {
  return useQuery("requests", async () => {
    const {
      requests: { edges },
    } = await graphqlClient.request(
      gql`
        query requests {
          requests {
            edges {
              node {
                id
                category {
                  name
                }
                media
                subcategory {
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
    const { request } = await graphqlClient.request(
      gql`
        query requestById($request_id: Int!) {
          request(id: $request_id) {
            id
            category {
              name
            }
            requestCharacteristics {
              edges {
                node {
                  initialValue
                  attribute {
                    name
                  }
                }
              }
            }
            media
            subcategory {
              name
            }
          }
        }
      `,
      { request_id }
    );
    return request;
  });
}
