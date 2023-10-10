import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";

const Featured = ({ user, setuser }) => {
  const [mostPurchasedProduct, setMostPurchasedProduct] = useState(null);
  const [totalPurchaseCount, setTotalPurchaseCount] = useState(0);
  const [percentage, setPercentage] = useState(0);
  useEffect(() => {
    if (user && user.uid) {
      const unsub = onSnapshot(
        query(collection(db, "alısveris"), where("userId", "==", user.uid)),
        (snapshot) => {
          const productCounts = {};
          let totalPurchases = 0;
          snapshot.docs.forEach((doc) => {
            const item = doc.data();
            const productName = item.isim;
            const purchaseCount = item.adet;
            productCounts[productName] = (productCounts[productName] || 0) + purchaseCount;
            totalPurchases += purchaseCount;
          });

          let mostPurchasedProductName = null;
          let maxCount = 0;

          Object.keys(productCounts).forEach((productName) => {
            if (productCounts[productName] > maxCount) {
              mostPurchasedProductName = productName;
              maxCount = productCounts[productName];
            }
          });

          if (mostPurchasedProductName) {
            const mostPurchasedProduct = {
              productName: mostPurchasedProductName,
              purchaseCount: maxCount,
            };
            setMostPurchasedProduct(mostPurchasedProduct);
            setTotalPurchaseCount(totalPurchases);

             const calculatedPercentage = (maxCount / totalPurchases) * 100;
            setPercentage(calculatedPercentage);
          }
        },
        (error) => {
          console.log(error);
        }
      );

      return () => {
        unsub();
      };
    }
  }, [user, setuser]);

  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Toplam Gelir</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar  value={percentage} text={`${percentage.toFixed(2)}%`} strokeWidth={5} />
        </div>
        {mostPurchasedProduct && mostPurchasedProduct.productName && (
          <>
            <p className="title">En çok aldığın ürün: {mostPurchasedProduct.productName}</p>
            <p className="amount">Adet: {mostPurchasedProduct.purchaseCount}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Featured;
