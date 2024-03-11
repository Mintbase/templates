use crate::*;

#[near_bindgen]
impl Contract {
    #[payable]
    pub fn nft_mint(&mut self, token_id: TokenId, metadata: TokenMetadata, receiver_id: AccountId) {
        //measure the initial storage being used on the contract
        let initial_storage_usage = env::storage_usage();

        //specify the token struct that contains the owner ID
        let token = Token {
            //set the owner ID equal to the receiver ID passed into the function
            owner_id: receiver_id,
            //we set the approved account IDs to the default value (an empty map)
            approved_account_ids: Default::default(),
            //the next approval ID is set to 0
            next_approval_id: 0,
        };

        //insert the token ID and token struct and make sure that the token doesn't exist
        assert!(
            self.tokens_by_id.insert(&token_id, &token).is_none(),
            "Token already exists"
        );

        //insert the token ID and metadata
        self.token_metadata_by_id.insert(&token_id, &metadata);

        //call the internal method for adding the token to the owner
        self.internal_add_token_to_owner(&token.owner_id, &token_id);

        //calculate the required storage which was the used - initial
        let required_storage_in_bytes = env::storage_usage() - initial_storage_usage;

        //refund any excess storage if the user attached too much. Panic if they didn't attach enough to cover the required.
        refund_deposit(required_storage_in_bytes);
    }

    pub fn update_medatada_pet(&mut self, token_id: String, pet_attribute: PetAttribute) {
        let mut token = self.token_metadata_by_id.get(&token_id).unwrap();

        let data: String = format!(
            "name:{}, image:{}, level:{}, score:{}, status:{:?}, star:{}",
            pet_attribute.pet_name,
            pet_attribute.image,
            pet_attribute.level,
            pet_attribute.score,
            pet_attribute.status,
            pet_attribute.star
        );

        token.description = Some(data);

        token.media = Some(pet_attribute.image);

        self.token_metadata_by_id.insert(&token_id, &token);
    }

    pub fn update_token_metadata(&mut self, token_id: String, token_metadata: TokenMetadata) {
        let mut token = self.token_metadata_by_id.get(&token_id).unwrap();

        // Update new token metadata
        token.title = token_metadata.title;
        token.description = token_metadata.description;
        token.media = token_metadata.media;
        token.media_hash = token_metadata.media_hash;
        token.copies = token_metadata.copies;
        token.issued_at = token_metadata.issued_at;
        token.expires_at = token_metadata.expires_at;
        token.starts_at = token_metadata.starts_at;
        token.updated_at = token_metadata.updated_at;
        token.extra = token_metadata.extra;
        token.reference = token_metadata.reference;
        token.reference_hash = token_metadata.reference_hash;

        self.token_metadata_by_id.insert(&token_id, &token);
    }
}
