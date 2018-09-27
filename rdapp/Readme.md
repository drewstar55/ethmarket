# Steps to run ReactJS version of DApp


* Compile your SmartContracts and deploy using below command in terminal from **ethmarket**  directory

> truffle migrate --reset --compile-all --network ganache

* Once your smart contracts are successfully compiled and deployed then copy contracts from **ethmarket/build/contracts** to **rdapp/src/assets** 

* Now time to run React DApp, for this run below commands from **rdapp** directory

 > 1. Install all required packages using below command
 > > *npm install*

> 2. To build sass run below command
> > *npm rebuild node-sass*
> 3. Now start app using below command
> > *npm start* 
