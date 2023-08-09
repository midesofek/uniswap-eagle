//fetch class from generated file
import { ERCToken } from "../generated/UniswapV3Factory/ERCToken";
//import datatype
import { Address } from "@graphprotocol/graph-ts";

/* 
function to get the token name
parameter: Address of the token
returns: token name (type: string)
*/
export function getTokenName(tokenAddress: Address): string {
  //binding the address
  let contract = ERCToken.bind(tokenAddress);
  let tokenName = "unknown";

  // calling the try_name() function to retrieve the name
  // the function definition can be found in:
  // ../generated/UniswapV3Factory/ERCToken
  let name = contract.try_name();
  if (!name.reverted) {
    tokenName = name.value;
  }
  //return token name
  return tokenName;
}
/* 
function to get the token symbol
parameter: Address of the token
returns: token symbol (type: string)
*/
export function getTokenSymbol(tokenAddress: Address): string {
  //binding the address
  let contract = ERCToken.bind(tokenAddress);
  let tokenSymbol = "unknown";
  // calling the try_symbol() function to retrieve the name
  // the function definition can be found in:
  // ../generated/UniswapV3Factory/ERCToken
  let symbol = contract.try_symbol();
  if (!symbol.reverted) {
    tokenSymbol = symbol.value;
  }
  //return token symbol
  return tokenSymbol;
}
