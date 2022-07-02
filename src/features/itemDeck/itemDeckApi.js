import request, { gql } from "graphql-request";
import { useQuery } from "react-query";
import { API_URL } from "../../app/api";

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

export function useItemById(item_id) {
  return useQuery("itemById", async () => {
    const { itemById } = await request(
      API_URL,
      gql`
        query itemById($item_id: Int!) {
          itemById(id: $item_id) {
            id
            categoryByCategoryId {
              name
            }
            itemCharacteristicsByItemId {
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
      { item_id }
    );
    return itemById;
  });
}
