﻿using System;
using System.Linq;
using System.Web.Http;
using DemoMethods.Entities;
using DemoMethods.Helpers;
using DemoMethods.Indexes;
using Raven.Abstractions.Data;
using Raven.Client;

namespace DemoMethods.Advanced
{
    public partial class AdvancedController : DemoApiController
    {
        [HttpGet]
        public object LazyFunctionality(string c = "companies/20")
        {
            using (var session = DocumentStoreHolder.Store.OpenSession())
            {
                Lazy<Company> company = session.Advanced.Lazily.Load<Company>(c);
                Lazy<int> countOfOrders = session.Query<Order>().Where(x => x.Company == c).CountLazily();

                session.Advanced.Eagerly.ExecuteAllPendingLazyOperations();

                return new
                {
                    CompanyName = company.Value.Name,
                    NumberOfOrders = countOfOrders.Value,
                    session.Advanced.NumberOfRequests
                };
            }
        }
    }
}
