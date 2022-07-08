import request, { gql } from "graphql-request";
import { useMutation, useQuery } from "react-query";
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
            subcategoryBySubcategoryId {
              name
            }
            itemCharacteristicsByItemId {
              edges {
                node {
                  attributeId
                  optionId
                }
              }
            }
            media
          }
        }
      `,
      { item_id }
    );
    return itemById;
  });
}

export function useAttributeById(attributeId) {
  return useQuery(["attributeById", attributeId], async () => {
    const { attributeById } = await request(
      API_URL,
      gql`
        query attributeById {
          attributeById(id: ${parseInt(attributeId)}) {
            id
            name
            relationshipsByAttributeId {
              edges {
                node {
                  optionByOptionId {
                    id
                    value
                  }
                }
              }
            }
          }
        }
      `
    );
    return attributeById;
  });
}

export function useOptionById(optionId) {
  return useQuery(["optionById", optionId], async () => {
    const { optionById } = await request(
      API_URL,
      gql`
        query optionById {
          optionById(id: ${parseInt(optionId)}) {
            id
            value
          }
        }
      `
    );
    return optionById;
  });
}

export function useUpdateCharacteristic() {
  return useMutation(async (characteristicPatch) => {
    await request(
      API_URL,
      gql`
        mutation MyQuery(
          $oldOptionId: Int!
          $attributeId: Int!
          $itemId: Int!
          $newOptionId: Int!
        ) {
          updateItemCharacteristicByItemIdAndAttributeIdAndOptionId(
            input: {
              itemCharacteristicPatch: { optionId: $newOptionId }
              itemId: $itemId
              attributeId: $attributeId
              optionId: $oldOptionId
            }
          ) {
            clientMutationId
          }
        }
      `,
      {
        newOptionId: characteristicPatch.newOptionId,
        itemId: characteristicPatch.itemId,
        attributeId: characteristicPatch.attributeId,
        oldOptionId: characteristicPatch.oldOptionId,
      }
    );
  });
}
