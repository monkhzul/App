
select DocumentId from SMTTerms.dbo.t_Orders where DocumentNo = 'bc9999001229'

SELECT [DocumentId],[Quantity] ,[Amount] ,[Price] ,[PriceWODiscount], v.Capacity
            FROM [SMTTerms].[dbo].[t_OrderDetails] t 
			left join SMTTerms.dbo.vGoods_Elements v on t.Article=v.Article
			where DocumentId = '96872'

SELECT [DocumentId], t.[Quantity] ,t.[Amount] ,t.[Price] ,[PriceWODiscount], v.Capacity, p.InCase
            FROM [SMTTerms].[dbo].[t_OrderDetails] t 
			left join SMTTerms.dbo.vGoods_Elements v on t.Article=v.Article
			left join SMTTerms.dbo.t_Products p on t.Article=p.Article
			where DocumentId = '96872'


select t.Article, t.Capacity, p.InCase, pr.BPrice 
                            from SMTTerms.dbo.vGoods_Elements t
                            left join SMTTerms.dbo.t_Products p
                            on t.Article=p.Article
                            left join SMTTerms.dbo.t_Pricelists pr
                            on pr.Article=p.Article
                            and pr.PLTypeId=1
                            where Brand like '%bonaqua%' and t.Article = ${arr[i].article}
