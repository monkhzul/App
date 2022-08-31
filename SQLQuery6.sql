SELECT o.[DocumentId],[DocumentNo],[PaymentTermId]
    ,[DDate],[State],[Description],[DateCreate], t.Amount, b.phonenumber
    FROM [SMTTerms].[dbo].[t_Orders] o
	left join SMTTerms.dbo.t_OrderDetails t on t.DocumentId=o.DocumentId
	left join Anungoo_db.dbo.t_BtoCphoneno b on o.DocumentNo = b.orderno collate SQL_Latin1_General_CP1251_CI_AS
	where DocumentNo like 'bc%'

	SELECT [DocumentId], t.[Quantity] ,t.[Amount] ,t.[Price] ,[PriceWODiscount], v.Capacity, p.InCase
            FROM [SMTTerms].[dbo].[t_OrderDetails] t 
			left join SMTTerms.dbo.vGoods_Elements v on t.Article=v.Article
			left join SMTTerms.dbo.t_Products p on t.Article=p.Article
			where DocumentId = '96872'