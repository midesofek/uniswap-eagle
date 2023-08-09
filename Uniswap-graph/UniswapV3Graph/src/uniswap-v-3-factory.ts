//import event class from generated files
import { PoolCreated as PoolCreatedEvent } from "../generated/UniswapV3Factory/UniswapV3Factory";
//import entity classes from generated files
import { Pool, Token } from "../generated/schema";
//import functions from tokenUtils
import { getTokenName, getTokenSymbol } from "./tokenUtils";
//import type
import { BigInt } from "@graphprotocol/graph-ts";

//function for handling PoolCreatedEvent
export function handlePoolCreated(event: PoolCreatedEvent): void {
  // loading the entities
  // Here, the id of the token is essentially its address
  // converted to string. While loading, we use the id to see
  // if an entity with that id exists
  let token0 = Token.load(event.params.token0.toHexString());
  let token1 = Token.load(event.params.token1.toHexString());
  // check if entity is empty null
  if (token0 === null) {
    //if empty
    // create new entity
    // while creating new Token entity, the address of the token is
    // converted to string and it is passed as the id
    token0 = new Token(event.params.token0.toHexString());
    token0.name = getTokenName(event.params.token0); //get name
    token0.symbol = getTokenSymbol(event.params.token0); //get symbol
  }
  if (token1 === null) {
    token1 = new Token(event.params.token1.toHexString());
    token1.name = getTokenName(event.params.token1);
    token1.symbol = getTokenSymbol(event.params.token1);
  }
  //create new entity
  // here, the address of the pool is converted to string
  // and passed as the id
  let pool = new Pool(event.params.pool.toHexString()) as Pool;
  pool.token0 = token0.id; //set token id
  pool.token1 = token1.id;
  pool.timestamp = event.block.timestamp; //set timestamp
  pool.blockNumber = event.block.number; //set block number
  pool.feeAmount = BigInt.fromI32(event.params.fee); //set fee

  //save entities
  token0.save();
  token1.save();
  pool.save();
}
