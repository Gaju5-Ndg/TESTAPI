import AccessControl from "accesscontrol";
import { extend } from "joi";

const ac =new AccessControl();
exports.roles =(function() {


    ac.grant("deliveryMan")
  .readOwn("profile")


  ac.grant("client")
  .readOwn("profile")

  ac.grant("vendor")
    extend("deliveryMan")
    extend("client")

  ac.grant("admin")
    extend("deliveryMan")
    extend("client")
    extend("vendor")

  ac.grant("superAdmin")
     extend("deliveryMan")
     extend("client")
     extend("vendor")
     extend("admin")
        .readOwn("profile")
        .updateOwn("profile")
        
        
      return ac;
}) ();
export default roles;