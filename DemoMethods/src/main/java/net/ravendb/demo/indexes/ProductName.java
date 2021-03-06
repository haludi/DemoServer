package net.ravendb.demo.indexes;

import net.ravendb.client.indexes.AbstractIndexCreationTask;

public class ProductName extends AbstractIndexCreationTask {

    public ProductName() {
        map = "from product in docs.Products " +
                "select new { " +
                "  Name = product.Name " +
                "}";
    }

}
