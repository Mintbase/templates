
use crate::*;

use near_sdk::{ext_contract, PromiseResult};

#[ext_contract(ext_self)]
pub trait CallbackSelf {
    fn update_metadata_callback(&mut self, token_id: String, new_metadata: TokenMetadata); 
}

#[near_bindgen]
impl Contract {
    #[private]
    pub fn update_metadata_callback(&mut self, token_id: String, new_metadata: TokenMetadata) -> TokenMetadata{
        assert_eq!(env::promise_results_count(), 1, "ERR_TOO_MANY_RESULTS");
        match env::promise_result(0) {
            PromiseResult::NotReady => unreachable!(),
            PromiseResult::Successful(_) => {
                // if success 
                // update new metadata
                self.token_metadata_by_id.insert(&token_id, &new_metadata);
                new_metadata
            }
            PromiseResult::Failed => {
                env::panic_str("Can not update metadata by delegator ");
            }
        }
    
    }
}
