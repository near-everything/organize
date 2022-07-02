import request, { gql } from "graphql-request";
import { useQuery } from "react-query";

export const API_URL = process.env.REACT_APP_EVERYTHING_API_URL;

export function useItems() {
  return useQuery("items", async () => {
    const {
      allItems: { edges },
    } = await request(
      API_URL,
      gql`
        query allItems {
          allItems {
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

export function useItemById() {
  return useQuery("itemById", async () => {
    const { itemById } = await request(
      API_URL,
      gql`
        query itemById {
          itemById(id: 33) {
            id
            categoryByCategoryId {
              name
            }
            characteristicsByItemId {
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
      `
    );
    return itemById;
  });
}
