import { Exchange } from "../generated/schema";
import { Transfer } from "../generated/Transfer/USDT";

export function handleTransfer(event: Transfer): void {
  let tranfer = Exchange.load(event.transaction.hash.toHex());
  if (tranfer === null) {
    tranfer = new Exchange(event.transaction.hash.toHex());
  }

  tranfer.block = event.block.number;
  tranfer.from = event.params.from.toHex();
  tranfer.to = event.params.to.toHex();
  tranfer.amount = event.params.value;

  tranfer.save();
}
