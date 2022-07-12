import { gql } from "graphql-request";
import { useMutation, useQuery } from "react-query"; 
import { graphqlClient } from "../../app/api";

export function useItems() {
  return useQuery("items", async () => {
    const {
      items: { edges },
    } = await graphqlClient.request(
      gql`
        query items {
          items {
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

export function useItemById(item_id) {
  return useQuery("itemById", async () => {
    const { item } = await graphqlClient.request(
      gql`
        query itemById($item_id: Int!) {
          item(id: $item_id) {
            id
            category {
              name
            }
            subcategory {
              name
            }
            itemCharacteristics {
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
    return item;
  });
}

export function useAttributeById(attributeId) {
  return useQuery(["attributeById", attributeId], async () => {
    const { attribute } = await graphqlClient.request(
      gql`
        query attributeById {
          attribute(id: ${parseInt(attributeId)}) {
            id
            name
            relationships {
              edges {
                node {
                  option {
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
    return attribute;
  });
}

export function useOptionById(optionId) {
  return useQuery(["optionById", optionId], async () => {
    const { option } = await graphqlClient.request(
      gql`
        query optionById {
          option(id: ${parseInt(optionId)}) {
            id
            value
          }
        }
      `
    );
    return option;
  });
}

export function useUpdateCharacteristic() {
  return useMutation(async (characteristicPatch) => {
    await graphqlClient.request(
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
