using Company.DAL.DTOs;
using Company.DAL.Interfaces;
using Company.DAL.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Company.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvoiceController : ControllerBase
    {

        private readonly IInvoiceRepository _invoiceService;
        public InvoiceController(IInvoiceRepository invoiceService)
        {
            _invoiceService = invoiceService;
        }



        // GET: api/<InvoiceController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var result = await _invoiceService.GetInvoices();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // GET api/<InvoiceController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var invoiceFound = await _invoiceService.GetInvoiceById(id);
                if (invoiceFound == null) return NotFound();

                return Ok(invoiceFound);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // POST api/<InvoiceController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] InvoiceDto dataInvoice)
        {
            try
            {
                var resultInvoice = await _invoiceService.PostInvoice(dataInvoice);
                return Ok(resultInvoice);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        //public async Task<IActionResult> Post([FromBody] Invoice dataInvoice)
        //{
        //    try
        //    {
        //        var resultInvoice = await _invoiceService.PostInvoice(dataInvoice);
        //        return Ok(resultInvoice);
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }
        //}



        // PUT api/<InvoiceController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Invoice dataInvoice)
        {
            try
            {
                if (id != dataInvoice.Id) return NotFound();
                await _invoiceService.UpdateInvoice(id, dataInvoice);
                return Ok(new { message = "Data updated successfuly." });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        // DELETE api/<InvoiceController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var result = await _invoiceService.DeleteInvoiceById(id);
                if (result == "NOT_FOUND") return NotFound();
                return Ok(new { message = "Data deleted successfuly." });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
    }
}
