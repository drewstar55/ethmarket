pragma solidity ^0.4.22;

import "./EIP20Interface.sol";
import "./library/SafeMath.sol";

contract EIP20 is EIP20Interface {
 using SafeMath for uint256;

 string constant public name = "Online Market Place";
 string constant public symbol = "OMP";
 uint8 constant public decimals = 3;

 mapping (address => uint256) private balances;

 /**
 * Ideally this mapping of the mapping shall be used. However, in this contract, I don't see
 * a need yet.
 */
 mapping (address => mapping(address => uint256)) private allowed;

/**
* Initially the total supply will be zero. However, based on the store's loyalty
* policy the store can issue a token, which will be valid across the market place.
*/
 uint256 private totalSupply_ = 0;

event IssuedNewTokens(
      address _senderAddress,
      address _toAddress,
      uint256 _amount );

 /**
 * @dev Total number of tokens in existence
 */
 function totalSupply() public view returns (uint256) {
   return totalSupply_;
 }

 /**
 * @dev Gets the balance of the specified address.
 * @param _owner The address to query the the balance of.
 * @return An uint256 representing the amount owned by the passed address.
 */
 function balanceOf(address _owner) public view returns (uint256) {
   return balances[_owner];
 }

 /**
  * @dev Function to check the amount of tokens that an owner allowed to a spender.
  * @param _owner address The address which owns the funds.
  * @param _spender address The address which will spend the funds.
  * @return A uint256 specifying the amount of tokens still available for the spender.
  */
 function allowance(
   address _owner,
   address _spender
  )
   public
   view
   returns (uint256)
 {
   return allowed[_owner][_spender];
 }

 /**
 * @dev Transfer token for a specified address
 * @param _to The address to transfer to.
 * @param _value The amount to be transferred.
 */
 function transfer(address _to, uint256 _value) public returns (bool) {
   require(_value <= balances[msg.sender]);
   require(_to != address(0));

   balances[msg.sender] = balances[msg.sender].sub(_value);
   balances[_to] = balances[_to].add(_value);
   emit Transfer(msg.sender, _to, _value);
   return true;
 }

 /**
  * @dev Approve the passed address to spend the specified amount of tokens on behalf of msg.sender.
  * TODO: Currently, I am not using the allowed mapping. Which means I am partially fullfilling the
  *       ERC20 token standard.
  *
  * @param _spender The address which will spend the funds.
  * @param _value The amount of tokens to be spent.
  */
 function approve(address _spender, uint256 _value) public returns (bool) {
   // allowed[msg.sender][_spender] = _value;
   emit Approval(msg.sender, _spender, _value);
   return true;
 }

 /**
  * @dev Transfer tokens from one address to another
  * @param _from address The address which you want to send tokens from
  * @param _to address The address which you want to transfer to
  * @param _value uint256 the amount of tokens to be transferred
  */
 function transferFrom(
   address _from,
   address _to,
   uint256 _value
 )
   public
   returns (bool)
 {
   require(_value <= balances[_from]);
   // require(_value <= allowed[_from][msg.sender]);
   require(_to != address(0));

   balances[_from] = balances[_from].sub(_value);
   balances[_to] = balances[_to].add(_value);
   // allowed[_from][msg.sender] = allowed[_from][msg.sender].sub(_value);
   emit Transfer(_from, _to, _value);
   return true;
 }

 /**
 * @dev this function will issue new tokens to the to address.
 * @param _senderAddress - the smart contract using this method should know that the sender is ultimately
 *      responsible for honoring all the tokens created in this system
 * @param _toAddress - this accont will be credited with certain tokens
 * @param _amount - the amount
 * @return the balance of the account to whom the token is being issued
 */
 function issueNewTokens(
              address _senderAddress,
              address _toAddress,
              uint256 _amount ) public returns (uint256){

    _mint(_toAddress, _amount);
    emit IssuedNewTokens(_senderAddress, _toAddress, _amount);
    return balances[_toAddress];
 }

 /**
  *
  * @dev Internal function that mints an amount of the token and assigns it to
  * an account. This encapsulates the modification of balances such that the
  * proper events are emitted.
  * @param _account The account that will receive the created tokens.
  * @param _amount The amount that will be created.
  */
 function _mint(address _account, uint256 _amount) internal {
   require(_account != 0);
   totalSupply_ = totalSupply_.add(_amount);
   balances[_account] = balances[_account].add(_amount);
   emit Transfer(address(0), _account, _amount);
 }

 /**
  * @dev Internal function that burns an amount of the token of a given
  * account.
  * @param _account The account whose tokens will be burnt.
  * @param _amount The amount that will be burnt.
  */
 function _burn(address _account, uint256 _amount) internal {
   require(_account != 0);
   require(_amount <= balances[_account]);

   totalSupply_ = totalSupply_.sub(_amount);
   balances[_account] = balances[_account].sub(_amount);
   emit Transfer(_account, address(0), _amount);
 }

}
